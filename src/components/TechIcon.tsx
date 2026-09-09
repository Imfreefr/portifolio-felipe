import { SiHtml5, SiCss, SiJavascript, SiPhp, SiLaravel, SiMysql, SiGit, SiGithub } from 'react-icons/si';
import { cn } from '../utils/helpers';

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
  'aria-label'?: string;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  html: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  php: SiPhp,
  laravel: SiLaravel,
  mysql: SiMysql,
  git: SiGit,
  github: SiGithub,
};

const colorMap: Record<string, string> = {
  html: '#E34F26',
  css: '#1572B6',
  javascript: '#F7DF1E',
  php: '#777BB4',
  laravel: '#FF2D20',
  mysql: '#4479A1',
  git: '#F05032',
  github: '#181717',
};

export function TechIcon({ name, size = 32, className, 'aria-label': ariaLabel }: TechIconProps) {
  const IconComponent = iconMap[name.toLowerCase()];
  const color = colorMap[name.toLowerCase()] || '#0ea5e9';

  if (!IconComponent) {
    return (
      <div
        className={cn('flex items-center justify-center text-white font-bold', className)}
        style={{ width: size, height: size }}
        aria-label={ariaLabel || `Logo do ${name}`}
        role="img"
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <span
      className={cn('inline-flex', className)}
      aria-label={ariaLabel || `Logo do ${name}`}
      role="img"
    >
      <IconComponent size={size} color={color} aria-hidden="true" />
    </span>
  );
}

export function TechIconColored({ name, size = 32, className, 'aria-label': ariaLabel }: TechIconProps) {
  const IconComponent = iconMap[name.toLowerCase()];
  const color = colorMap[name.toLowerCase()] || '#0ea5e9';

  if (!IconComponent) {
    return (
      <div
        className={cn('flex items-center justify-center', className)}
        style={{ width: size, height: size, backgroundColor: color, borderRadius: '8px' }}
        aria-label={ariaLabel || `Logo do ${name}`}
        role="img"
      >
        <span className="text-white font-bold text-[0.6em]">{name.charAt(0)}</span>
      </div>
    );
  }

  return (
    <div
      className={cn('flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      aria-label={ariaLabel || `Logo do ${name}`}
      role="img"
    >
      <IconComponent size={size} color={color} aria-hidden="true" />
    </div>
  );
}

export function getTechColor(name: string): string {
  return colorMap[name.toLowerCase()] || '#0ea5e9';
}

export function getTechIcon(name: string) {
  return iconMap[name.toLowerCase()];
}