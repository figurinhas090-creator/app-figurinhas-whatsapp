'use client';

import { useState, useRef, useEffect } from 'react';
import { Download, Image as ImageIcon, Type, Sticker, Sparkles, Trash2, Save, Share2, Undo, Redo, Plus, X, User, LogOut, Mail, Lock, Check, Crown, Zap, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';

interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontWeight: string;
}

interface StickerElement {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
}

interface SavedSticker {
  id: string;
  dataUrl: string;
  timestamp: number;
  userId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: number;
  plan: 'free' | 'monthly' | 'annual';
  stickerCredits: number;
}

const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=512&h=512&fit=crop',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=512&h=512&fit=crop',
  'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=512&h=512&fit=crop',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=512&h=512&fit=crop',
  'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=512&h=512&fit=crop',
  'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=512&h=512&fit=crop',
];

const EMOJI_STICKERS = ['😂', '❤️', '🔥', '👍', '🎉', '😍', '🤔', '👏', '💯', '✨', '🌟', '💪', '🙌', '😎', '🤩', '😜'];

const FILTERS = [
  { name: 'Normal', filter: 'none' },
  { name: 'Sépia', filter: 'sepia(100%)' },
  { name: 'P&B', filter: 'grayscale(100%)' },
  { name: 'Contraste', filter: 'contrast(150%)' },
  { name: 'Brilho', filter: 'brightness(120%)' },
  { name: 'Saturação', filter: 'saturate(200%)' },
];

const PRICING_PLANS = [
  {
    id: 'monthly',
    name: 'Plano Mensal',
    price: 'R$ 19,90',
    period: '/mês',
    features: [
      'Figurinhas ilimitadas',
      'Todos os filtros',
      'Sem marca d\'água',
      'Suporte prioritário',
      'Acesso a novos recursos',
    ],
    color: 'from-blue-500 to-cyan-500',
    popular: false,
  },
  {
    id: 'annual',
    name: 'Plano Anual',
    price: 'R$ 49,90',
    period: '/ano',
    savings: 'Economize 75%',
    features: [
      'Figurinhas ilimitadas',
      'Todos os filtros',
      'Sem marca d\'água',
      'Suporte VIP 24/7',
      'Acesso antecipado a recursos',
      '2 meses grátis',
    ],
    color: 'from-purple-500 to-pink-500',
    popular: true,
  },
  {
    id: 'per-sticker',
    name: 'Pague por Figurinha',
    price: 'R$ 0,50',
    period: '/figurinha',
    features: [
      'Sem assinatura',
      'Pague apenas pelo que usar',
      'Todos os filtros',
      'Sem marca d\'água',
      'Créditos não expiram',
    ],
    color: 'from-green-500 to-emerald-500',
    popular: false,
  },
];

export default function StickerMaker() {
  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPricing, setShowPricing] = useState(false);

  // App State
  const [currentImage, setCurrentImage] = useState<string>('');
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [stickerElements, setStickerElements] = useState<StickerElement[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [savedStickers, setSavedStickers] = useState<SavedSticker[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load current user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('current-user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Load saved stickers from localStorage
  useEffect(() => {
    if (currentUser) {
      const saved = localStorage.getItem('whatsapp-stickers');
      if (saved) {
        const allStickers = JSON.parse(saved);
        const userStickers = allStickers.filter((s: SavedSticker) => s.userId === currentUser.id);
        setSavedStickers(userStickers);
      }
    }
  }, [currentUser]);

  // Save to localStorage whenever savedStickers changes
  useEffect(() => {
    if (currentUser && savedStickers.length > 0) {
      const saved = localStorage.getItem('whatsapp-stickers');
      const allStickers = saved ? JSON.parse(saved) : [];
      
      const otherUsersStickers = allStickers.filter((s: SavedSticker) => s.userId !== currentUser.id);
      const updatedStickers = [...otherUsersStickers, ...savedStickers];
      
      localStorage.setItem('whatsapp-stickers', JSON.stringify(updatedStickers));
    }
  }, [savedStickers, currentUser]);

  const updateUserInStorage = (updatedUser: User) => {
    // Update current user
    localStorage.setItem('current-user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);

    // Update in users array
    const usersData = localStorage.getItem('users');
    const users: User[] = usersData ? JSON.parse(usersData) : [];
    const updatedUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleRegister = () => {
    if (!authForm.name || !authForm.email || !authForm.password) {
      toast.error('Preencha todos os campos!');
      return;
    }

    const usersData = localStorage.getItem('users');
    const users: User[] = usersData ? JSON.parse(usersData) : [];

    if (users.some(u => u.email === authForm.email)) {
      toast.error('Email já cadastrado!');
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: authForm.name,
      email: authForm.email,
      password: authForm.password,
      createdAt: Date.now(),
      plan: 'free',
      stickerCredits: 3, // 3 figurinhas grátis
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('current-user', JSON.stringify(newUser));
    
    setCurrentUser(newUser);
    setAuthForm({ name: '', email: '', password: '' });
    toast.success(`Bem-vindo, ${newUser.name}! Você ganhou 3 figurinhas grátis!`);
  };

  const handleLogin = () => {
    if (!authForm.email || !authForm.password) {
      toast.error('Preencha email e senha!');
      return;
    }

    const usersData = localStorage.getItem('users');
    const users: User[] = usersData ? JSON.parse(usersData) : [];

    const user = users.find(u => u.email === authForm.email && u.password === authForm.password);

    if (!user) {
      toast.error('Email ou senha incorretos!');
      return;
    }

    localStorage.setItem('current-user', JSON.stringify(user));
    setCurrentUser(user);
    setAuthForm({ name: '', email: '', password: '' });
    toast.success(`Bem-vindo de volta, ${user.name}!`);
  };

  const handleLogout = () => {
    localStorage.removeItem('current-user');
    setCurrentUser(null);
    setSavedStickers([]);
    setCurrentImage('');
    setTextElements([]);
    setStickerElements([]);
    toast.success('Logout realizado!');
  };

  const handleSelectPlan = (planId: string) => {
    if (!currentUser) return;

    let updatedUser = { ...currentUser };

    if (planId === 'monthly') {
      updatedUser.plan = 'monthly';
      updatedUser.stickerCredits = -1; // Ilimitado
      toast.success('Plano Mensal ativado! Figurinhas ilimitadas! 🎉');
    } else if (planId === 'annual') {
      updatedUser.plan = 'annual';
      updatedUser.stickerCredits = -1; // Ilimitado
      toast.success('Plano Anual ativado! Figurinhas ilimitadas + 2 meses grátis! 🎉');
    } else if (planId === 'per-sticker') {
      // Simular compra de 10 créditos
      updatedUser.stickerCredits += 10;
      toast.success('10 créditos adicionados! Crie suas figurinhas! 🎨');
    }

    updateUserInStorage(updatedUser);
    setShowPricing(false);
  };

  const canCreateSticker = () => {
    if (!currentUser) return false;
    if (currentUser.plan === 'monthly' || currentUser.plan === 'annual') return true;
    return currentUser.stickerCredits > 0;
  };

  const getRemainingCredits = () => {
    if (!currentUser) return 0;
    if (currentUser.plan === 'monthly' || currentUser.plan === 'annual') return -1; // Ilimitado
    return currentUser.stickerCredits;
  };

  const addToHistory = () => {
    const state = {
      image: currentImage,
      texts: textElements,
      stickers: stickerElements,
      filter: selectedFilter,
    };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(state);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setCurrentImage(prevState.image);
      setTextElements(prevState.texts);
      setStickerElements(prevState.stickers);
      setSelectedFilter(prevState.filter);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setCurrentImage(nextState.image);
      setTextElements(nextState.texts);
      setStickerElements(nextState.stickers);
      setSelectedFilter(nextState.filter);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCurrentImage(event.target?.result as string);
        addToHistory();
        toast.success('Imagem carregada!');
      };
      reader.readAsDataURL(file);
    }
  };

  const selectPresetImage = (url: string) => {
    setCurrentImage(url);
    addToHistory();
    toast.success('Imagem selecionada!');
  };

  const addText = () => {
    const newText: TextElement = {
      id: Date.now().toString(),
      text: 'Seu texto aqui',
      x: 50,
      y: 50,
      fontSize: 32,
      color: '#FFFFFF',
      fontWeight: 'bold',
    };
    setTextElements([...textElements, newText]);
    addToHistory();
  };

  const updateText = (id: string, updates: Partial<TextElement>) => {
    setTextElements(textElements.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const removeText = (id: string) => {
    setTextElements(textElements.filter(t => t.id !== id));
    addToHistory();
  };

  const addSticker = (emoji: string) => {
    const newSticker: StickerElement = {
      id: Date.now().toString(),
      emoji,
      x: 50,
      y: 50,
      size: 48,
    };
    setStickerElements([...stickerElements, newSticker]);
    addToHistory();
    toast.success('Adesivo adicionado!');
  };

  const updateSticker = (id: string, updates: Partial<StickerElement>) => {
    setStickerElements(stickerElements.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const removeSticker = (id: string) => {
    setStickerElements(stickerElements.filter(s => s.id !== id));
    addToHistory();
  };

  const generateSticker = async () => {
    if (!currentImage) {
      toast.error('Selecione uma imagem primeiro!');
      return;
    }

    if (!currentUser) {
      toast.error('Faça login para salvar figurinhas!');
      return;
    }

    if (!canCreateSticker()) {
      toast.error('Você não tem créditos! Adquira um plano ou compre créditos.');
      setShowPricing(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 512;
    canvas.height = 512;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = currentImage;

    img.onload = () => {
      ctx.clearRect(0, 0, 512, 512);
      ctx.filter = selectedFilter;

      const scale = Math.min(512 / img.width, 512 / img.height);
      const x = (512 - img.width * scale) / 2;
      const y = (512 - img.height * scale) / 2;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      ctx.filter = 'none';

      textElements.forEach(text => {
        ctx.font = `${text.fontWeight} ${text.fontSize}px Arial`;
        ctx.fillStyle = text.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.strokeText(text.text, text.x, text.y);
        ctx.fillText(text.text, text.x, text.y);
      });

      stickerElements.forEach(sticker => {
        ctx.font = `${sticker.size}px Arial`;
        ctx.fillText(sticker.emoji, sticker.x, sticker.y);
      });

      const dataUrl = canvas.toDataURL('image/png');
      
      const newSticker: SavedSticker = {
        id: Date.now().toString(),
        dataUrl,
        timestamp: Date.now(),
        userId: currentUser.id,
      };
      setSavedStickers([newSticker, ...savedStickers]);

      // Deduzir crédito se não for plano ilimitado
      if (currentUser.plan === 'free') {
        const updatedUser = { ...currentUser, stickerCredits: currentUser.stickerCredits - 1 };
        updateUserInStorage(updatedUser);
      }

      toast.success('Figurinha salva na sua coleção!');
    };
  };

  const downloadSticker = (dataUrl: string) => {
    const link = document.createElement('a');
    link.download = `sticker-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
    toast.success('Figurinha baixada!');
  };

  const shareToWhatsApp = (dataUrl: string) => {
    fetch(dataUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'sticker.png', { type: 'image/png' });
        
        if (navigator.share && navigator.canShare({ files: [file] })) {
          navigator.share({
            files: [file],
            title: 'Minha Figurinha',
          }).then(() => {
            toast.success('Compartilhado com sucesso!');
          }).catch(() => {
            toast.error('Erro ao compartilhar');
          });
        } else {
          downloadSticker(dataUrl);
          toast.info('Baixe e compartilhe manualmente no WhatsApp');
        }
      });
  };

  const clearCanvas = () => {
    setCurrentImage('');
    setTextElements([]);
    setStickerElements([]);
    setSelectedFilter('none');
    addToHistory();
    toast.success('Canvas limpo!');
  };

  const deleteSticker = (id: string) => {
    setSavedStickers(savedStickers.filter(s => s.id !== id));
    toast.success('Figurinha removida!');
  };

  // Pricing Modal
  if (showPricing && currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Button
              onClick={() => setShowPricing(false)}
              variant="secondary"
              className="mb-4"
            >
              <X className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3">
              Escolha seu Plano
            </h1>
            <p className="text-white/90 text-lg">
              Crie figurinhas incríveis sem limites!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICING_PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={`relative p-6 rounded-3xl shadow-2xl transition-all hover:scale-105 ${
                  plan.popular ? 'ring-4 ring-yellow-400' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Crown className="w-4 h-4" />
                    MAIS POPULAR
                  </div>
                )}

                <div className={`bg-gradient-to-r ${plan.color} text-white p-4 rounded-2xl mb-4`}>
                  <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-lg opacity-90">{plan.period}</span>
                  </div>
                  {plan.savings && (
                    <div className="mt-2 bg-white/20 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                      {plan.savings}
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-semibold py-6 text-lg`}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Escolher Plano
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Auth Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-8 h-8 text-green-500" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Criador de Figurinhas
              </h1>
            </div>
            <p className="text-gray-600">
              {isLogin ? 'Entre na sua conta' : 'Crie sua conta e ganhe 3 figurinhas grátis!'}
            </p>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-sm font-semibold mb-2 block">
                  Nome Completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-sm font-semibold mb-2 block">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-semibold mb-2 block">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              onClick={isLogin ? handleLogin : handleRegister}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-6"
            >
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </Button>

            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const remainingCredits = getRemainingCredits();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300" />
            <h1 className="text-3xl sm:text-5xl font-bold text-white">
              Criador de Figurinhas
            </h1>
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300" />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-white/90 text-base sm:text-lg">
              Olá, {currentUser.name}!
            </p>
            <div className="flex items-center gap-2">
              {currentUser.plan === 'free' ? (
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold">
                  {remainingCredits} {remainingCredits === 1 ? 'crédito restante' : 'créditos restantes'}
                </div>
              ) : (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full text-white font-semibold flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  {currentUser.plan === 'monthly' ? 'Plano Mensal' : 'Plano Anual'} - Ilimitado
                </div>
              )}
              <Link href="/site">
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Site
                </Button>
              </Link>
              <Button
                onClick={() => setShowPricing(true)}
                variant="secondary"
                size="sm"
                className="rounded-full"
              >
                <Zap className="w-4 h-4 mr-2" />
                Planos
              </Button>
              <Button
                onClick={handleLogout}
                variant="secondary"
                size="sm"
                className="rounded-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Editor Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Editor</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  className="rounded-full"
                >
                  <Undo className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  className="rounded-full"
                >
                  <Redo className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={clearCanvas}
                  className="rounded-full"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Canvas Preview */}
            <div className="relative bg-gray-100 rounded-2xl p-4 mb-4 min-h-[300px] sm:min-h-[400px] flex items-center justify-center overflow-hidden">
              {currentImage ? (
                <div className="relative w-full max-w-[400px] aspect-square">
                  <img
                    src={currentImage}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-xl"
                    style={{ filter: selectedFilter }}
                  />
                  {textElements.map(text => (
                    <div
                      key={text.id}
                      className="absolute cursor-move"
                      style={{
                        left: `${text.x}px`,
                        top: `${text.y}px`,
                        fontSize: `${text.fontSize}px`,
                        color: text.color,
                        fontWeight: text.fontWeight,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                      }}
                      draggable
                      onDragEnd={(e) => {
                        const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                        if (rect) {
                          updateText(text.id, {
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top,
                          });
                        }
                      }}
                    >
                      {text.text}
                    </div>
                  ))}
                  {stickerElements.map(sticker => (
                    <div
                      key={sticker.id}
                      className="absolute cursor-move"
                      style={{
                        left: `${sticker.x}px`,
                        top: `${sticker.y}px`,
                        fontSize: `${sticker.size}px`,
                      }}
                      draggable
                      onDragEnd={(e) => {
                        const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                        if (rect) {
                          updateSticker(sticker.id, {
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top,
                          });
                        }
                      }}
                    >
                      {sticker.emoji}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <ImageIcon className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p className="text-sm sm:text-base">Selecione uma imagem para começar</p>
                </div>
              )}
            </div>

            {/* Tools Tabs */}
            <Tabs defaultValue="image" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="image" className="text-xs sm:text-sm">
                  <ImageIcon className="w-4 h-4 mr-1 sm:mr-2" />
                  Imagem
                </TabsTrigger>
                <TabsTrigger value="text" className="text-xs sm:text-sm">
                  <Type className="w-4 h-4 mr-1 sm:mr-2" />
                  Texto
                </TabsTrigger>
                <TabsTrigger value="stickers" className="text-xs sm:text-sm">
                  <Sticker className="w-4 h-4 mr-1 sm:mr-2" />
                  Adesivos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="image" className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Carregar Imagem</Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Escolher do Dispositivo
                  </Button>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block">Imagens Prontas</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESET_IMAGES.map((url, idx) => (
                      <button
                        key={idx}
                        onClick={() => selectPresetImage(url)}
                        className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-green-500 transition-all hover:scale-105"
                      >
                        <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block">Filtros</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {FILTERS.map((f) => (
                      <Button
                        key={f.name}
                        variant={selectedFilter === f.filter ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setSelectedFilter(f.filter);
                          addToHistory();
                        }}
                        className="text-xs"
                      >
                        {f.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-4">
                <Button onClick={addText} className="w-full bg-blue-500 hover:bg-blue-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Texto
                </Button>

                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {textElements.map((text) => (
                    <div key={text.id} className="p-3 bg-gray-50 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <Input
                          value={text.text}
                          onChange={(e) => updateText(text.id, { text: e.target.value })}
                          className="flex-1 mr-2"
                          placeholder="Digite seu texto"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeText(text.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">Tamanho</Label>
                          <Slider
                            value={[text.fontSize]}
                            onValueChange={([value]) => updateText(text.id, { fontSize: value })}
                            min={16}
                            max={72}
                            step={1}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Cor</Label>
                          <input
                            type="color"
                            value={text.color}
                            onChange={(e) => updateText(text.id, { color: e.target.value })}
                            className="w-full h-8 rounded cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="stickers" className="space-y-4">
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {EMOJI_STICKERS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => addSticker(emoji)}
                      className="aspect-square text-3xl sm:text-4xl hover:scale-110 transition-transform bg-gray-50 rounded-xl hover:bg-gray-100"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                {stickerElements.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Adesivos Adicionados</Label>
                    {stickerElements.map((sticker) => (
                      <div key={sticker.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                        <span className="text-2xl">{sticker.emoji}</span>
                        <div className="flex items-center gap-2">
                          <Slider
                            value={[sticker.size]}
                            onValueChange={([value]) => updateSticker(sticker.id, { size: value })}
                            min={24}
                            max={96}
                            step={1}
                            className="w-24"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSticker(sticker.id)}
                            className="text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="mt-6 space-y-2">
              <Button
                onClick={generateSticker}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-6 text-base sm:text-lg"
                disabled={!currentImage || !canCreateSticker()}
              >
                <Save className="w-5 h-5 mr-2" />
                {canCreateSticker() ? 'Salvar Figurinha' : 'Sem Créditos - Ver Planos'}
              </Button>
              {!canCreateSticker() && (
                <p className="text-center text-sm text-gray-600">
                  Você precisa de créditos ou um plano para criar figurinhas
                </p>
              )}
            </div>
          </div>

          {/* Saved Stickers Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              Minha Coleção ({savedStickers.length})
            </h2>

            {savedStickers.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Sticker className="w-16 h-16 mx-auto mb-3 opacity-50" />
                <p className="text-sm sm:text-base">Nenhuma figurinha salva ainda</p>
                <p className="text-xs sm:text-sm mt-2">Crie sua primeira figurinha!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto">
                {savedStickers.map((sticker) => (
                  <div
                    key={sticker.id}
                    className="relative group bg-gray-50 rounded-2xl p-2 hover:shadow-lg transition-all"
                  >
                    <img
                      src={sticker.dataUrl}
                      alt="Sticker"
                      className="w-full aspect-square object-contain rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => downloadSticker(sticker.dataUrl)}
                        className="rounded-full"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => shareToWhatsApp(sticker.dataUrl)}
                        className="rounded-full bg-green-500 hover:bg-green-600 text-white"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => deleteSticker(sticker.id)}
                        className="rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Hidden Canvas for Export */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
