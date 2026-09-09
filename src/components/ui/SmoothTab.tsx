import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import './SmoothTab.css';

export interface SmoothTabItem {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  color: string;
  cardContent?: React.ReactNode;
}

interface SmoothTabProps {
  items: SmoothTabItem[];
  defaultTabId?: string;
  className?: string;
  onChange?: (tabId: string) => void;
}

export default function SmoothTab({ items, defaultTabId, className = '', onChange }: SmoothTabProps) {
  const [selected, setSelected] = useState(defaultTabId ?? items[0]?.id ?? '');
  const [direction, setDirection] = useState(0);
  const selectedItem = items.find((item) => item.id === selected) ?? items[0];

  const selectTab = (id: string) => {
    const current = items.findIndex((item) => item.id === selected);
    const next = items.findIndex((item) => item.id === id);
    setDirection(next >= current ? 1 : -1);
    setSelected(id);
    onChange?.(id);
  };

  if (!selectedItem) return null;

  return (
    <div className={`smooth-tab ${className}`}>
      <div className="smooth-tab-content">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={selectedItem.id}
            custom={direction}
            variants={{
              enter: (value: number) => ({ opacity: 0, x: value > 0 ? 36 : -36, scale: 0.97 }),
              center: { opacity: 1, x: 0, scale: 1 },
              exit: (value: number) => ({ opacity: 0, x: value > 0 ? -36 : 36, scale: 0.97 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="smooth-tab-card"
          >
            <div className="smooth-tab-card-icon" style={{ color: selectedItem.color }}>
              {selectedItem.icon && <selectedItem.icon className="h-6 w-6" aria-hidden="true" />}
            </div>
            <div>
              <p className="smooth-tab-kicker">Categoria selecionada</p>
              <h3>{selectedItem.title}</h3>
              <p>{selectedItem.description}</p>
            </div>
            <div className="smooth-tab-wave" style={{ background: selectedItem.color }} aria-hidden="true" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="smooth-tab-list" role="tablist" aria-label="Categorias de projetos">
        {items.map((item) => {
          const active = item.id === selected;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              className={active ? 'active' : ''}
              style={active ? { background: item.color } : undefined}
              onClick={() => selectTab(item.id)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') selectTab(items[(items.findIndex((entry) => entry.id === item.id) + 1) % items.length].id);
                if (event.key === 'ArrowLeft') selectTab(items[(items.findIndex((entry) => entry.id === item.id) - 1 + items.length) % items.length].id);
              }}
            >
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}