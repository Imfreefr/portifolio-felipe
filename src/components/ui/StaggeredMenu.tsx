import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './StaggeredMenu.css';

interface MenuItem { label: string; ariaLabel: string; link: string; }
interface SocialItem { label: string; link: string; }
interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items: MenuItem[];
  socialItems?: SocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  logoUrl?: string;
  accentColor?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export default function StaggeredMenu({
  position = 'right', colors = ['#5227FF', '#d94a5f'], items, socialItems = [],
  displaySocials = true, displayItemNumbering = true, logoUrl = '/imgs/noctra-simbolo-branco-transparente.png',
  accentColor = '#d94a5f', menuButtonColor = '#fff', openMenuButtonColor = '#fff',
  changeMenuColorOnOpen = true, closeOnClickAway = true, onMenuOpen, onMenuClose,
}: StaggeredMenuProps) {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const [textLines, setTextLines] = useState(['Menu']);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const layers = preLayersRef.current ? Array.from(preLayersRef.current.children) : [];
    if (!panel) return;
    const offscreen = position === 'left' ? -100 : 100;
    gsap.set([panel, ...layers], { xPercent: offscreen, opacity: 1 });
    gsap.set(textInnerRef.current, { yPercent: 0 });
    gsap.set(toggleBtnRef.current, { color: menuButtonColor });
  }, [menuButtonColor, position]);

  const closeMenu = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;
    timelineRef.current?.kill();
    const layers = preLayersRef.current ? Array.from(preLayersRef.current.children) : [];
    const offscreen = position === 'left' ? -100 : 100;
    gsap.to([...layers, panel], { xPercent: offscreen, duration: .32, ease: 'power3.in', onComplete: () => setOpen(false) });
    gsap.to(iconRef.current, { rotate: 0, duration: .3 });
    if (changeMenuColorOnOpen) gsap.to(toggleBtnRef.current, { color: menuButtonColor, duration: .25 });
    setTextLines(['Menu']);
    openRef.current = false;
    onMenuClose?.();
  }, [changeMenuColorOnOpen, menuButtonColor, onMenuClose, position]);

  const toggleMenu = useCallback(() => {
    if (openRef.current) { closeMenu(); return; }
    const panel = panelRef.current;
    if (!panel) return;
    openRef.current = true;
    setOpen(true);
    onMenuOpen?.();
    const layers = preLayersRef.current ? Array.from(preLayersRef.current.children) : [];
    const offscreen = position === 'left' ? -100 : 100;
    timelineRef.current?.kill();
    timelineRef.current = gsap.timeline();
    layers.forEach((layer, index) => timelineRef.current?.to(layer, { xPercent: 0, duration: .45, ease: 'power4.out' }, index * .06));
    timelineRef.current.to(panel, { xPercent: 0, duration: .65, ease: 'power4.out' }, layers.length * .06);
    const labels = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    gsap.set(labels, { yPercent: 140, rotate: 8 });
    timelineRef.current.to(labels, { yPercent: 0, rotate: 0, duration: .8, ease: 'power4.out', stagger: .08 }, .28);
    gsap.to(iconRef.current, { rotate: 225, duration: .6, ease: 'power3.out' });
    if (changeMenuColorOnOpen) gsap.to(toggleBtnRef.current, { color: openMenuButtonColor, duration: .25 });
    setTextLines(['Menu', 'Fechar']);
  }, [changeMenuColorOnOpen, closeMenu, onMenuOpen, openMenuButtonColor, position]);

  useLayoutEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handler = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node) && !toggleBtnRef.current?.contains(event.target as Node)) closeMenu();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [closeMenu, closeOnClickAway, open]);

  return (
    <div className="staggered-menu-wrapper fixed-wrapper" style={{ ['--sm-accent' as string]: accentColor }} data-position={position} data-open={open || undefined}>
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {colors.slice(0, 3).map((color) => <div key={color} className="sm-prelayer" style={{ background: color }} />)}
      </div>
      <header className="staggered-menu-header" aria-label="Navegação principal">
        <a href="#home" onClick={(event) => { event.preventDefault(); closeMenu(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }} className="sm-logo">
          <img src={logoUrl} alt="Noctra" className="sm-logo-img" width="110" height="32" />
        </a>
        <button ref={toggleBtnRef} className="sm-toggle" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={toggleMenu}>
          <span className="sm-toggle-textWrap" aria-hidden="true"><span ref={textInnerRef} className="sm-toggle-textInner">{textLines.map((line, index) => <span className="sm-toggle-line" key={`${line}-${index}`}>{line}</span>)}</span></span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true"><span className="sm-icon-line" /><span className="sm-icon-line sm-icon-line-v" /></span>
        </button>
      </header>
      <aside ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items.map((item) => <li className="sm-panel-itemWrap" key={item.label}><a className="sm-panel-item" href={item.link} aria-label={item.ariaLabel} onClick={closeMenu}><span className="sm-panel-itemLabel">{item.label}</span></a></li>)}
          </ul>
          {displaySocials && socialItems.length > 0 && <div className="sm-socials"><h3 className="sm-socials-title">Redes sociais</h3><ul className="sm-socials-list">{socialItems.map((item) => <li key={item.label}><a className="sm-socials-link" href={item.link} target="_blank" rel="noopener noreferrer">{item.label}</a></li>)}</ul></div>}
        </div>
      </aside>
    </div>
  );
}