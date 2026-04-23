import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home, HeartPulse, Ribbon, FlaskConical, BookOpen, Sun, Moon, Menu, X, Activity,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/heart-attack', label: 'Heart Attack', icon: HeartPulse },
  { to: '/breast-cancer', label: 'Breast Cancer', icon: Ribbon },
  { to: '/playground', label: 'Model Playground', icon: FlaskConical },
  { to: '/about', label: 'About / Paper', icon: BookOpen },
];

export default function Sidebar() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-xl bg-white dark:bg-navy-800 shadow-lg"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 z-50 flex flex-col bg-white dark:bg-navy-950 border-r border-gray-200 dark:border-navy-800 transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200 dark:border-navy-800">
          <div className="p-2 rounded-xl bg-teal-500/10">
            <Activity className="text-teal-500" size={28} />
          </div>
          <div>
            <h1 className="text-lg font-bold gradient-text leading-tight">Healthcare ML</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Prediction System</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn('nav-link', isActive && 'nav-link-active')
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Theme toggle */}
        <div className="px-4 py-4 border-t border-gray-200 dark:border-navy-800">
          <button
            onClick={toggle}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors"
          >
            <motion.div
              animate={{ rotate: dark ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {dark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-navy-600" />}
            </motion.div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {dark ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
