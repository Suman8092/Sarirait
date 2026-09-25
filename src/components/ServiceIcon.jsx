import React from 'react';
import {
  Globe,
  Smartphone,
  LayoutGrid,
  ShoppingBag,
  ShieldCheck,
  TrendingUp,
  Search,
  MapPin,
  Share2,
  Target,
  Mail,
  MessageCircle,
  Database,
  Cpu,
  Users,
  Layers,
  Cloud,
  Code2,
  Sparkles,
  Palette,
  Image,
  Video,
  PenTool,
  Package,
  Box,
  HelpCircle
} from 'lucide-react';

const iconMap = {
  Globe,
  Smartphone,
  LayoutGrid,
  ShoppingBag,
  ShieldCheck,
  TrendingUp,
  Search,
  MapPin,
  Share2,
  Target,
  Mail,
  MessageCircle,
  Database,
  Cpu,
  Users,
  Layers,
  Cloud,
  Code2,
  Sparkles,
  Palette,
  Image,
  Video,
  PenTool,
  Package,
  Box
};

export default function ServiceIcon({ name, className = "w-4 h-4" }) {
  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent className={className} />;
}
