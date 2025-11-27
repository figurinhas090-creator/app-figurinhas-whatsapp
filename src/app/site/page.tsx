'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Zap, Crown, Check, Star, Users, Download, Share2, Palette, Type, Sticker, ImageIcon, ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const features = [
    {
      icon: <ImageIcon className="w-8 h-8" />,
      title: 'Imagens Prontas',
      description: 'Escolha entre dezenas de imagens prontas ou faça upload das suas próprias fotos',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Filtros Incríveis',
      description: 'Aplique filtros profissionais: sépia, P&B, contraste, brilho e muito mais',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Type className="w-8 h-8" />,
      title: 'Textos Personalizados',
      description: 'Adicione textos com fontes customizadas, cores e tamanhos variados',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Sticker className="w-8 h-8" />,
      title: 'Adesivos Divertidos',
      description: 'Centenas de emojis e adesivos para deixar suas figurinhas ainda mais expressivas',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: 'Download Instantâneo',
      description: 'Baixe suas figurinhas em alta qualidade, prontas para usar no WhatsApp',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: 'Compartilhe Fácil',
      description: 'Compartilhe diretamente no WhatsApp com apenas um clique',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  const plans = [
    {
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

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Criadora de Conteúdo',
      avatar: '👩',
      text: 'Simplesmente incrível! Criei mais de 100 figurinhas personalizadas para meus grupos. Super fácil de usar!',
      rating: 5,
    },
    {
      name: 'João Santos',
      role: 'Designer',
      avatar: '👨',
      text: 'A qualidade das figurinhas é excelente. Os filtros são profissionais e o resultado final é perfeito!',
      rating: 5,
    },
    {
      name: 'Ana Costa',
      role: 'Empresária',
      avatar: '👩‍💼',
      text: 'Uso para criar figurinhas da minha empresa. Meus clientes adoram! Vale cada centavo do plano anual.',
      rating: 5,
    },
  ];

  const stats = [
    { number: '50K+', label: 'Usuários Ativos' },
    { number: '1M+', label: 'Figurinhas Criadas' },
    { number: '4.9★', label: 'Avaliação Média' },
    { number: '99%', label: 'Satisfação' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-300 animate-pulse" />
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold">
                Criador de Figurinhas
              </h1>
              <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-300 animate-pulse" />
            </div>
            
            <p className="text-xl sm:text-2xl lg:text-3xl mb-4 text-white/90 max-w-3xl mx-auto">
              Crie figurinhas incríveis para WhatsApp em segundos!
            </p>
            
            <p className="text-base sm:text-lg mb-8 text-white/80 max-w-2xl mx-auto">
              A ferramenta mais completa e fácil de usar para criar figurinhas personalizadas.
              Adicione textos, filtros, adesivos e muito mais!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/">
                <Button className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform">
                  <Zap className="w-5 h-5 mr-2" />
                  Começar Grátis
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full font-semibold"
              >
                <Heart className="w-5 h-5 mr-2" />
                3 Figurinhas Grátis
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-3xl sm:text-4xl font-bold mb-1">{stat.number}</div>
                  <div className="text-sm sm:text-base text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
              Recursos Incríveis
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para criar figurinhas profissionais e divertidas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-6 hover:shadow-2xl transition-all hover:scale-105 border-2 border-transparent hover:border-green-500">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
              Planos para Todos
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal para você e comece a criar figurinhas incríveis hoje mesmo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <Card
                key={idx}
                className={`relative p-8 rounded-3xl shadow-2xl transition-all hover:scale-105 ${
                  plan.popular ? 'ring-4 ring-yellow-400 bg-gradient-to-br from-white to-yellow-50' : 'bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <Crown className="w-4 h-4" />
                    MAIS POPULAR
                  </div>
                )}

                <div className={`bg-gradient-to-r ${plan.color} text-white p-6 rounded-2xl mb-6 -mx-2`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-lg opacity-90">{plan.period}</span>
                  </div>
                  {plan.savings && (
                    <div className="mt-3 bg-white/20 px-4 py-1 rounded-full text-sm font-semibold inline-block">
                      {plan.savings}
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/">
                  <Button
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-semibold py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all`}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Escolher Plano
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
              O Que Nossos Usuários Dizem
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Milhares de pessoas já estão criando figurinhas incríveis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="p-6 hover:shadow-2xl transition-all bg-white">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Pronto para Criar Suas Figurinhas?
          </h2>
          <p className="text-xl sm:text-2xl mb-8 text-white/90">
            Comece agora e ganhe 3 figurinhas grátis!
          </p>
          <Link href="/">
            <Button className="bg-white text-green-600 hover:bg-gray-100 text-xl px-12 py-8 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 mr-2" />
              Começar Gratuitamente
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </Link>
          <p className="mt-6 text-white/80">
            Sem cartão de crédito necessário • 3 figurinhas grátis • Cancele quando quiser
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-green-400" />
                <span className="font-bold text-lg">Criador de Figurinhas</span>
              </div>
              <p className="text-gray-400 text-sm">
                A melhor ferramenta para criar figurinhas personalizadas para WhatsApp.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Produto</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Criador de Figurinhas. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
