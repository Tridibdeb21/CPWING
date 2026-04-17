import React, { useEffect, useRef, useState } from 'react';
import { Eraser, PenLine, RotateCcw, Trash2, Download, Hand, ImagePlus } from 'lucide-react';

const DEFAULT_COLOR = '#0ea5e9';
const DEFAULT_PEN_SIZE = 3;
const DEFAULT_ERASER_SIZE = 20;
const INITIAL_CANVAS_WIDTH = 2200;
const INITIAL_CANVAS_HEIGHT = 1400;
const EXPAND_TRIGGER_OFFSET = 180;
const EXPAND_STEP = 900;
const PEN_COLORS = ['#0ea5e9', '#ef4444', '#22c55e', '#a855f7', '#f59e0b', '#111827', '#ffffff'];
const PEN_CURSOR = 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2732%27 height=%2732%27 viewBox=%270 0 32 32%27%3E%3Ccircle cx=%2716%27 cy=%2716%27 r=%277%27 fill=%27none%27 stroke=%27%23000000%27 stroke-width=%272%27/%3E%3Ccircle cx=%2716%27 cy=%2716%27 r=%272%27 fill=%27%230ea5e9%27/%3E%3C/svg%3E") 16 16, crosshair';
const ERASER_CURSOR = 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2732%27 height=%2732%27 viewBox=%270 0 32 32%27%3E%3Ccircle cx=%2716%27 cy=%2716%27 r=%279%27 fill=%27%23ffffff%27 stroke=%27%23000000%27 stroke-width=%272%27/%3E%3C/svg%3E") 16 16, crosshair';
const WHITEBOARD_STORAGE_KEY = 'cpwing.whiteboard.state.v1';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const viewportRef = useRef(null);
  const fileInputRef = useRef(null);
  const drawingRef = useRef(false);
  const panningRef = useRef(false);
  const imageActionRef = useRef(null);
  const lastPointRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  const [tool, setTool] = useState('pen');
  const [penSize, setPenSize] = useState(DEFAULT_PEN_SIZE);
  const [eraserSize, setEraserSize] = useState(DEFAULT_ERASER_SIZE);
  const [penColor, setPenColor] = useState(DEFAULT_COLOR);
  const [history, setHistory] = useState([]);
  const [imageItems, setImageItems] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [boardSize, setBoardSize] = useState({ width: INITIAL_CANVAS_WIDTH, height: INITIAL_CANVAS_HEIGHT });

  const saveBoardStateToStorage = (imagesOverride, scrollOverride) => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    if (!canvas || !viewport) return;

    const payload = {
      width: canvas.width,
      height: canvas.height,
      data: canvas.toDataURL('image/png'),
      images: imagesOverride || imageItems,
      scrollLeft: scrollOverride ? scrollOverride.scrollLeft : viewport.scrollLeft,
      scrollTop: scrollOverride ? scrollOverride.scrollTop : viewport.scrollTop,
      savedAt: Date.now()
    };

    try {
      localStorage.setItem(WHITEBOARD_STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.warn('Unable to persist whiteboard state:', error);
    }
  };

  const loadBoardStateFromStorage = () => {
    try {
      const raw = localStorage.getItem(WHITEBOARD_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.data || !parsed.width || !parsed.height) return null;
      return parsed;
    } catch {
      return null;
    }
  };

  const fillWhiteBackground = (ctx, width, height) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
  };

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const persisted = loadBoardStateFromStorage();
    const initialWidth = persisted ? persisted.width : INITIAL_CANVAS_WIDTH;
    const initialHeight = persisted ? persisted.height : INITIAL_CANVAS_HEIGHT;

    canvas.width = initialWidth;
    canvas.height = initialHeight;
    setBoardSize({ width: initialWidth, height: initialHeight });
    const ctx = canvas.getContext('2d');
    fillWhiteBackground(ctx, canvas.width, canvas.height);

    if (persisted) {
      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
      image.src = persisted.data;
      setImageItems(Array.isArray(persisted.images) ? persisted.images : []);
    }
  };

  const saveSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const snapshot = {
      data: canvas.toDataURL('image/png'),
      width: canvas.width,
      height: canvas.height,
      images: imageItems.map((item) => ({ ...item }))
    };
    setHistory((prev) => [...prev.slice(-19), snapshot]);
  };

  const restoreSnapshot = (snapshot) => {
    const canvas = canvasRef.current;
    if (!canvas || !snapshot) return;

    canvas.width = snapshot.width;
    canvas.height = snapshot.height;
    setBoardSize({ width: snapshot.width, height: snapshot.height });

    const ctx = canvas.getContext('2d');
    fillWhiteBackground(ctx, canvas.width, canvas.height);

    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.src = snapshot.data;

    setImageItems(snapshot.images || []);
    setSelectedImageId(null);
  };

  const growCanvas = (direction) => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    if (!canvas || !viewport) return;

    const prev = {
      data: canvas.toDataURL('image/png'),
      width: canvas.width,
      height: canvas.height
    };

    let nextWidth = canvas.width;
    let nextHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (direction === 'left' || direction === 'right') {
      nextWidth += EXPAND_STEP;
      if (direction === 'left') {
        offsetX = EXPAND_STEP;
      }
    }

    if (direction === 'up' || direction === 'down') {
      nextHeight += EXPAND_STEP;
      if (direction === 'up') {
        offsetY = EXPAND_STEP;
      }
    }

    canvas.width = nextWidth;
    canvas.height = nextHeight;
    setBoardSize({ width: nextWidth, height: nextHeight });

    const ctx = canvas.getContext('2d');
    fillWhiteBackground(ctx, nextWidth, nextHeight);

    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, offsetX, offsetY, prev.width, prev.height);
    };
    image.src = prev.data;

    if (direction === 'left') {
      viewport.scrollLeft += EXPAND_STEP;
      lastPointRef.current.x += EXPAND_STEP;
      setImageItems((prevItems) => prevItems.map((item) => ({ ...item, x: item.x + EXPAND_STEP })));
    }

    if (direction === 'up') {
      viewport.scrollTop += EXPAND_STEP;
      lastPointRef.current.y += EXPAND_STEP;
      setImageItems((prevItems) => prevItems.map((item) => ({ ...item, y: item.y + EXPAND_STEP })));
    }
  };

  const expandCanvasIfNeeded = (point) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (point.x < EXPAND_TRIGGER_OFFSET) {
      growCanvas('left');
      point.x += EXPAND_STEP;
    } else if (point.x > canvas.width - EXPAND_TRIGGER_OFFSET) {
      growCanvas('right');
    }

    if (point.y < EXPAND_TRIGGER_OFFSET) {
      growCanvas('up');
      point.y += EXPAND_STEP;
    } else if (point.y > canvas.height - EXPAND_TRIGGER_OFFSET) {
      growCanvas('down');
    }
  };

  useEffect(() => {
    initializeCanvas();
    const viewport = viewportRef.current;
    if (!viewport) return;

    const persisted = loadBoardStateFromStorage();
    if (persisted) {
      viewport.scrollLeft = Math.max(0, persisted.scrollLeft || 0);
      viewport.scrollTop = Math.max(0, persisted.scrollTop || 0);
    } else {
      viewport.scrollLeft = Math.floor((INITIAL_CANVAS_WIDTH - viewport.clientWidth) / 2);
      viewport.scrollTop = Math.floor((INITIAL_CANVAS_HEIGHT - viewport.clientHeight) / 2);
    }
  }, []);

  const getPoint = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const source = event.touches ? event.touches[0] : event;
    return {
      x: source.clientX - rect.left,
      y: source.clientY - rect.top
    };
  };

  const startInteraction = (event) => {
    event.preventDefault();

    if (tool === 'move') {
      const source = event.touches ? event.touches[0] : event;
      const viewport = viewportRef.current;
      panningRef.current = true;
      panStartRef.current = {
        x: source.clientX,
        y: source.clientY,
        scrollLeft: viewport.scrollLeft,
        scrollTop: viewport.scrollTop
      };
      return;
    }

    if (imageActionRef.current) return;

    saveSnapshot();
    drawingRef.current = true;
    lastPointRef.current = getPoint(event);
    setSelectedImageId(null);
  };

  const moveInteraction = (event) => {
    if (tool === 'move' && panningRef.current) {
      event.preventDefault();
      const source = event.touches ? event.touches[0] : event;
      const viewport = viewportRef.current;
      const deltaX = source.clientX - panStartRef.current.x;
      const deltaY = source.clientY - panStartRef.current.y;
      viewport.scrollLeft = panStartRef.current.scrollLeft - deltaX;
      viewport.scrollTop = panStartRef.current.scrollTop - deltaY;
      return;
    }

    if (!drawingRef.current) return;
    event.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const point = getPoint(event);

    expandCanvasIfNeeded(point);

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = tool === 'eraser' ? eraserSize : penSize;
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : penColor;

    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    lastPointRef.current = point;
  };

  const stopInteraction = () => {
    if (drawingRef.current) {
      saveBoardStateToStorage();
    }
    drawingRef.current = false;
    panningRef.current = false;
  };

  const clearBoard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    saveSnapshot();
    fillWhiteBackground(ctx, canvas.width, canvas.height);
    setImageItems([]);
    setSelectedImageId(null);
    saveBoardStateToStorage([]);
  };

  const undo = () => {
    setHistory((prev) => {
      if (!prev.length) return prev;
      const next = [...prev];
      const last = next.pop();
      restoreSnapshot(last);
      setTimeout(() => {
        saveBoardStateToStorage(last.images || []);
      }, 0);
      return next;
    });
  };

  const loadImageFromSource = (src) => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Image load failed'));
    image.src = src;
  });

  const readAsDataUrl = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Unable to read file'));
    reader.readAsDataURL(file);
  });

  const addImageItem = async (src) => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    if (!canvas || !viewport) return;

    try {
      const image = await loadImageFromSource(src);
      const maxWidth = viewport.clientWidth * 0.75;
      const maxHeight = viewport.clientHeight * 0.75;
      const scale = Math.min(1, maxWidth / image.width, maxHeight / image.height);
      const width = Math.max(60, Math.floor(image.width * scale));
      const height = Math.max(60, Math.floor(image.height * scale));

      const x = Math.max(0, Math.min(viewport.scrollLeft + (viewport.clientWidth - width) / 2, canvas.width - width));
      const y = Math.max(0, Math.min(viewport.scrollTop + (viewport.clientHeight - height) / 2, canvas.height - height));

      saveSnapshot();
      const id = `img-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
      setImageItems((prev) => {
        const next = [...prev, { id, src, x, y, width, height }];
        setTimeout(() => saveBoardStateToStorage(next), 0);
        return next;
      });
      setSelectedImageId(id);
      setTool('move');
    } catch (error) {
      console.error('Unable to add image:', error);
    }
  };

  const handleImageFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const src = await readAsDataUrl(file);
    await addImageItem(src);
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files && event.target.files[0];
    await handleImageFile(file);
    event.target.value = '';
  };

  useEffect(() => {
    const onPaste = async (event) => {
      const items = event.clipboardData && event.clipboardData.items;
      if (!items || !items.length) return;

      for (const item of items) {
        if (item.type && item.type.startsWith('image/')) {
          event.preventDefault();
          const file = item.getAsFile();
          await handleImageFile(file);
          break;
        }
      }
    };

    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [imageItems]);

  const startImageMove = (event, imageId) => {
    event.preventDefault();
    event.stopPropagation();

    const source = event.touches ? event.touches[0] : event;
    const item = imageItems.find((img) => img.id === imageId);
    if (!item) return;

    saveSnapshot();
    setSelectedImageId(imageId);
    imageActionRef.current = {
      id: imageId,
      mode: 'move',
      startX: source.clientX,
      startY: source.clientY,
      initialX: item.x,
      initialY: item.y
    };
  };

  const startImageResize = (event, imageId) => {
    event.preventDefault();
    event.stopPropagation();

    const source = event.touches ? event.touches[0] : event;
    const item = imageItems.find((img) => img.id === imageId);
    if (!item) return;

    saveSnapshot();
    setSelectedImageId(imageId);
    imageActionRef.current = {
      id: imageId,
      mode: 'resize',
      startX: source.clientX,
      startY: source.clientY,
      initialWidth: item.width,
      initialHeight: item.height
    };
  };

  useEffect(() => {
    const onPointerMove = (event) => {
      if (!imageActionRef.current) return;

      const source = event.touches ? event.touches[0] : event;
      const action = imageActionRef.current;

      setImageItems((prev) => prev.map((item) => {
        if (item.id !== action.id) return item;

        if (action.mode === 'move') {
          const dx = source.clientX - action.startX;
          const dy = source.clientY - action.startY;
          return {
            ...item,
            x: Math.max(0, Math.min(action.initialX + dx, boardSize.width - item.width)),
            y: Math.max(0, Math.min(action.initialY + dy, boardSize.height - item.height))
          };
        }

        if (action.mode === 'resize') {
          const dx = source.clientX - action.startX;
          const dy = source.clientY - action.startY;
          return {
            ...item,
            width: Math.max(30, action.initialWidth + dx),
            height: Math.max(30, action.initialHeight + dy)
          };
        }

        return item;
      }));
    };

    const onPointerUp = () => {
      if (imageActionRef.current) {
        saveBoardStateToStorage();
      }
      imageActionRef.current = null;
    };

    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, [boardSize.width, boardSize.height]);

  const deleteSelectedImage = () => {
    if (!selectedImageId) return;
    saveSnapshot();
    setImageItems((prev) => {
      const next = prev.filter((item) => item.id !== selectedImageId);
      setTimeout(() => saveBoardStateToStorage(next), 0);
      return next;
    });
    setSelectedImageId(null);
  };

  const downloadBoard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const exportCtx = exportCanvas.getContext('2d');
    exportCtx.drawImage(canvas, 0, 0);

    for (const item of imageItems) {
      const image = await loadImageFromSource(item.src);
      exportCtx.drawImage(image, item.x, item.y, item.width, item.height);
    }

    const link = document.createElement('a');
    link.download = 'cpwing-dry-run-board.png';
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  };

  const getCanvasCursor = () => {
    if (tool === 'move') return 'grab';
    if (tool === 'eraser') return ERASER_CURSOR;
    return PEN_CURSOR;
  };

  useEffect(() => {
    const persistOnUnload = () => {
      const viewport = viewportRef.current;
      saveBoardStateToStorage(undefined, viewport ? { scrollLeft: viewport.scrollLeft, scrollTop: viewport.scrollTop } : undefined);
    };

    window.addEventListener('beforeunload', persistOnUnload);
    return () => window.removeEventListener('beforeunload', persistOnUnload);
  }, [imageItems]);

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '2.5rem', paddingBottom: '3.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem', padding: '0 1rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.2rem)', marginBottom: '0.5rem' }}>
          <span className="text-gradient">Dry Run Whiteboard</span>
        </h1>
      </div>

      <div className="glass-panel" style={{ maxWidth: '1200px', margin: '0 auto 1rem', padding: '0.9rem 1rem' }}>
        <h3 style={{ margin: '0 0 0.55rem 0', color: 'var(--text-primary)', fontSize: '1rem' }}>Feature Guidelines</h3>
        <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          <li>Use Pen and Eraser to dry run your logic step by step.</li>
          <li>Switch to Move to pan around the board in any direction.</li>
          <li>Use Add Image or Ctrl+V to insert an image, then drag to move and drag the corner to resize.</li>
          <li>Use Undo for recent actions, Clear to reset, and Save to download the board.</li>
        </ul>
      </div>

      <div className="glass-panel" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.85rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '0.8rem' }}>
          <button
            onClick={() => setTool('pen')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              border: tool === 'pen' ? '1px solid var(--accent-blue)' : '1px solid var(--glass-border)',
              background: tool === 'pen' ? 'rgba(3, 180, 188, 0.14)' : 'transparent',
              color: tool === 'pen' ? 'var(--accent-blue)' : 'var(--text-secondary)',
              borderRadius: '10px', padding: '0.55rem 0.8rem', cursor: 'pointer', fontWeight: '600'
            }}
          >
            <PenLine size={16} /> Pen
          </button>

          <button
            onClick={() => setTool('eraser')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              border: tool === 'eraser' ? '1px solid var(--accent-blue)' : '1px solid var(--glass-border)',
              background: tool === 'eraser' ? 'rgba(3, 180, 188, 0.14)' : 'transparent',
              color: tool === 'eraser' ? 'var(--accent-blue)' : 'var(--text-secondary)',
              borderRadius: '10px', padding: '0.55rem 0.8rem', cursor: 'pointer', fontWeight: '600'
            }}
          >
            <Eraser size={16} /> Eraser
          </button>

          <button
            onClick={() => setTool('move')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              border: tool === 'move' ? '1px solid var(--accent-blue)' : '1px solid var(--glass-border)',
              background: tool === 'move' ? 'rgba(3, 180, 188, 0.14)' : 'transparent',
              color: tool === 'move' ? 'var(--accent-blue)' : 'var(--text-secondary)',
              borderRadius: '10px', padding: '0.55rem 0.8rem', cursor: 'pointer', fontWeight: '600'
            }}
          >
            <Hand size={16} /> Move
          </button>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
            {PEN_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setTool('pen');
                  setPenColor(color);
                }}
                aria-label={`Select pen color ${color}`}
                style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  border: penColor === color && tool === 'pen' ? '2px solid var(--accent-blue)' : '1px solid rgba(148, 163, 184, 0.55)',
                  background: color, cursor: 'pointer', padding: 0
                }}
              />
            ))}
          </div>

          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
            {tool === 'eraser' ? 'Eraser Size' : 'Pen Size'}
            <input
              type="range"
              min={tool === 'eraser' ? '8' : '1'}
              max={tool === 'eraser' ? '80' : '24'}
              value={tool === 'eraser' ? eraserSize : penSize}
              onChange={(event) => {
                const nextSize = Number(event.target.value);
                if (tool === 'eraser') {
                  setEraserSize(nextSize);
                } else {
                  setPenSize(nextSize);
                }
              }}
              style={{ cursor: 'pointer' }}
            />
          </label>

          <button
            onClick={undo}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-secondary)',
              borderRadius: '10px', padding: '0.55rem 0.8rem', cursor: 'pointer', fontWeight: '600'
            }}
          >
            <RotateCcw size={16} /> Undo
          </button>

          <button
            onClick={clearBoard}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              border: '1px solid rgba(239, 68, 68, 0.5)', background: 'rgba(239, 68, 68, 0.12)', color: '#fca5a5',
              borderRadius: '10px', padding: '0.55rem 0.8rem', cursor: 'pointer', fontWeight: '600'
            }}
          >
            <Trash2 size={16} /> Clear
          </button>

          <button
            onClick={downloadBoard}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-secondary)',
              borderRadius: '10px', padding: '0.55rem 0.8rem', cursor: 'pointer', fontWeight: '600'
            }}
          >
            <Download size={16} /> Save
          </button>

          <button
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-secondary)',
              borderRadius: '10px', padding: '0.55rem 0.8rem', cursor: 'pointer', fontWeight: '600'
            }}
          >
            <ImagePlus size={16} /> Add Image
          </button>

          <button
            onClick={deleteSelectedImage}
            disabled={!selectedImageId}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              border: selectedImageId ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid var(--glass-border)',
              background: selectedImageId ? 'rgba(239, 68, 68, 0.12)' : 'transparent',
              color: selectedImageId ? '#fca5a5' : 'var(--text-secondary)',
              opacity: selectedImageId ? 1 : 0.6,
              borderRadius: '10px', padding: '0.55rem 0.8rem', cursor: selectedImageId ? 'pointer' : 'not-allowed', fontWeight: '600'
            }}
          >
            <Trash2 size={16} /> Delete Selected Image
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
        </div>

        <div
          ref={viewportRef}
          style={{
            width: '100%',
            height: 'clamp(520px, 70vh, 820px)',
            minHeight: '480px',
            overflow: 'auto',
            borderRadius: '12px',
            border: '1px solid var(--glass-border)',
            background: '#e2e8f0'
          }}
        >
          <div style={{ width: `${boardSize.width}px`, height: `${boardSize.height}px`, position: 'relative' }}>
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'block',
                background: '#ffffff',
                touchAction: 'none',
                cursor: getCanvasCursor()
              }}
              onMouseDown={startInteraction}
              onMouseMove={moveInteraction}
              onMouseUp={stopInteraction}
              onMouseLeave={stopInteraction}
              onTouchStart={startInteraction}
              onTouchMove={moveInteraction}
              onTouchEnd={stopInteraction}
            />

            {imageItems.map((item) => {
              const selected = selectedImageId === item.id;
              return (
                <div
                  key={item.id}
                  style={{
                    position: 'absolute',
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                    width: `${item.width}px`,
                    height: `${item.height}px`,
                    border: selected ? '2px solid var(--accent-blue)' : '1px dashed rgba(148, 163, 184, 0.7)',
                    boxSizing: 'border-box',
                    cursor: 'move',
                    userSelect: 'none'
                  }}
                  onMouseDown={(event) => startImageMove(event, item.id)}
                  onTouchStart={(event) => startImageMove(event, item.id)}
                >
                  <img
                    src={item.src}
                    alt="whiteboard item"
                    draggable={false}
                    style={{ width: '100%', height: '100%', objectFit: 'fill', pointerEvents: 'none' }}
                  />

                  {selected && (
                    <div
                      style={{
                        position: 'absolute',
                        right: '-7px',
                        bottom: '-7px',
                        width: '14px',
                        height: '14px',
                        borderRadius: '3px',
                        background: 'var(--accent-blue)',
                        border: '1px solid #ffffff',
                        cursor: 'nwse-resize'
                      }}
                      onMouseDown={(event) => startImageResize(event, item.id)}
                      onTouchStart={(event) => startImageResize(event, item.id)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whiteboard;
