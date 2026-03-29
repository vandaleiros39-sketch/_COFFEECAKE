import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  X, 
  Instagram, 
  MessageCircle, 
  Clock, 
  MapPin, 
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem, OrderDetails } from './types';
import { PRODUCTS, CATEGORIES, WHATSAPP_NUMBER, INSTAGRAM_HANDLE } from './constants';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(true);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    name: '',
    address: '',
    paymentMethod: 'Pix',
    deliveryType: 'delivery'
  });

  // Check shop status based on time (example: 9h to 22h)
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      setIsShopOpen(hour >= 9 && hour < 22);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const highlights = useMemo(() => PRODUCTS.filter(p => p.isHighlight && p.isAvailable), []);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const addToCart = (product: Product) => {
    if (!product.isAvailable || !isShopOpen) return;
    
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing && existing.quantity > 1) {
        return prev.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter(item => item.id !== productId);
    });
  };

  const clearCart = () => setCart([]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleCheckout = () => {
    if (!orderDetails.name || (orderDetails.deliveryType === 'delivery' && !orderDetails.address)) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const itemsText = cart.map(item => 
      `• ${item.quantity}x ${item.name} (${formatCurrency(item.price * item.quantity)})`
    ).join('\n');

    const message = `*Novo Pedido - COFFEE & CAKE*\n\n` +
      `*Cliente:* ${orderDetails.name}\n` +
      `*Tipo:* ${orderDetails.deliveryType === 'delivery' ? 'Entrega' : 'Retirada'}\n` +
      (orderDetails.deliveryType === 'delivery' ? `*Endereço:* ${orderDetails.address}\n` : '') +
      `*Pagamento:* ${orderDetails.paymentMethod}\n\n` +
      `*Itens:*\n${itemsText}\n\n` +
      `*Total:* ${formatCurrency(cartTotal)}\n\n` +
      `_Pedido enviado via Cardápio Digital_`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    
    setOrderConfirmed(true);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    clearCart();
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="relative h-64 flex flex-col items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200" 
            alt="Confeitaria Background" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-44 h-44 bg-black rounded-3xl mx-auto mb-6 p-4 shadow-2xl flex items-center justify-center overflow-hidden border border-white/10"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Crescent C */}
              <path 
                d="M150,50 A70,70 0 1,0 150,150 A55,55 0 1,1 150,50" 
                fill="white" 
              />
              {/* Whisk icon inside the C */}
              <g transform="translate(105, 75) rotate(-10)">
                <rect x="-1" y="0" width="3" height="35" fill="black" rx="1.5" />
                <path d="M0,35 Q-10,45 0,65 Q10,45 0,35" stroke="black" strokeWidth="1.5" fill="none" />
                <path d="M0,35 Q-5,45 0,60 Q5,45 0,35" stroke="black" strokeWidth="1" fill="none" />
              </g>
              {/* Drips on the C */}
              <path d="M85,148 Q85,158 90,158 Q95,158 95,148" fill="white" />
              <path d="M115,142 Q115,152 120,152 Q125,152 125,142" fill="white" />
              
              {/* Text: COFFEE & CAKE */}
              <text 
                x="100" 
                y="175" 
                fill="white" 
                fontSize="16" 
                fontWeight="900" 
                textAnchor="middle" 
                fontFamily="Arial Black, sans-serif"
              >
                COFFEE & CAKE
              </text>
              
              {/* Drips below text */}
              <g transform="translate(35, 178)">
                <path d="M10,0 Q10,12 14,12 Q18,12 18,0" fill="white" />
                <path d="M28,0 Q28,8 32,8 Q36,8 36,0" fill="white" />
                <path d="M48,0 Q48,18 54,18 Q60,18 60,0" fill="white" />
                <path d="M72,0 Q72,10 76,10 Q80,10 80,0" fill="white" />
                <path d="M92,0 Q92,15 98,15 Q104,15 104,0" fill="white" />
                <path d="M116,0 Q116,9 120,9 Q124,9 124,0" fill="white" />
                <path d="M136,0 Q136,14 140,14 Q144,14 144,0" fill="white" />
              </g>
            </svg>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-1 uppercase tracking-tighter"
          >
            COFFEE & CAKE
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-beige italic"
          >
            Doces artesanais feitos com amor
          </motion.p>
          
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${isShopOpen ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
              <Clock size={12} />
              {isShopOpen ? 'Loja Aberta' : 'Loja Fechada'}
            </span>
            <span className="text-xs text-white/60">• 9:00 - 22:00</span>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 -mt-8 relative z-20">
        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <a 
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-4 flex items-center gap-3 hover:bg-white transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 to-purple-600 rounded-xl flex items-center justify-center text-white shrink-0">
              <Instagram size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-caramel font-bold">Instagram</p>
              <p className="text-sm font-semibold truncate">@{INSTAGRAM_HANDLE}</p>
            </div>
          </a>
          
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-4 flex items-center gap-3 hover:bg-white transition-colors"
          >
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shrink-0">
              <MessageCircle size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-caramel font-bold">WhatsApp</p>
              <p className="text-sm font-semibold">PEDIR NO WHATSAPP</p>
            </div>
          </a>

          <div 
            className="glass-card rounded-2xl p-4 flex items-center gap-3 hover:bg-white transition-colors text-left"
          >
            <div className="w-10 h-10 bg-coffee-dark rounded-xl flex items-center justify-center text-white shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-caramel font-bold">Localização</p>
              <p className="text-sm font-semibold">Itaberá, SP</p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-8 bg-coffee-dark rounded-full"></span>
            Destaques da Semana
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
            {highlights.map(product => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -5 }}
                className="min-w-[280px] snap-center glass-card rounded-3xl overflow-hidden"
              >
                <div className="h-40 relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-coffee-dark font-bold text-sm shadow-sm">
                    {formatCurrency(product.price)}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-caramel line-clamp-2 mb-4 h-10">{product.description}</p>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-cream p-1 rounded-xl border border-beige/50">
                      <button 
                        onClick={() => removeFromCart(product.id)}
                        className="w-8 h-8 flex items-center justify-center text-coffee-dark hover:bg-beige rounded-lg"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">
                        {cart.find(item => item.id === product.id)?.quantity || 0}
                      </span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-8 h-8 flex items-center justify-center text-coffee-dark hover:bg-beige rounded-lg"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      disabled={!isShopOpen}
                      className="flex-1 btn-primary py-2.5 text-sm"
                    >
                      Eu quero
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <nav className="sticky top-4 z-30 mb-8 overflow-x-auto no-scrollbar py-2">
          <div className="flex gap-2 bg-beige/30 p-1.5 rounded-full backdrop-blur-md border border-white/20">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === 'all' ? 'bg-coffee-dark text-white shadow-lg' : 'text-coffee-dark hover:bg-white/50'}`}
            >
              Todos
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat.id ? 'bg-coffee-dark text-white shadow-lg' : 'text-coffee-dark hover:bg-white/50'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Product List */}
        <section className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => {
              const cartItem = cart.find(item => item.id === product.id);
              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={product.id}
                  className={`glass-card rounded-2xl p-3 flex flex-col gap-3 relative ${!product.isAvailable ? 'opacity-60 grayscale' : ''}`}
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col py-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-base leading-tight">{product.name}</h3>
                        <span className="font-bold text-coffee-dark whitespace-nowrap">{formatCurrency(product.price)}</span>
                      </div>
                      <p className="text-xs text-caramel line-clamp-2 mt-1">{product.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-beige/30">
                    <div className="flex items-center gap-3 bg-cream p-1 rounded-xl border border-beige/50">
                      <button 
                        onClick={() => removeFromCart(product.id)}
                        disabled={quantity === 0}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${quantity > 0 ? 'text-coffee-dark hover:bg-beige' : 'text-caramel opacity-30'}`}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-sm font-bold w-6 text-center">{quantity}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        disabled={!product.isAvailable || !isShopOpen}
                        className="w-8 h-8 flex items-center justify-center text-coffee-dark hover:bg-beige rounded-lg transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {product.isAvailable && isShopOpen ? (
                      <button 
                        onClick={() => quantity === 0 && addToCart(product)}
                        className={`flex-1 ml-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${quantity > 0 ? 'bg-green-600 text-white' : 'bg-coffee-dark text-white hover:bg-coffee-medium'}`}
                      >
                        {quantity > 0 ? (
                          <>
                            <CheckCircle2 size={16} />
                            No carrinho
                          </>
                        ) : (
                          'Eu quero'
                        )}
                      </button>
                    ) : (
                      <span className="flex-1 ml-4 text-center text-[10px] font-bold uppercase text-red-500 bg-red-50 py-2.5 rounded-xl">
                        {!isShopOpen ? 'Loja Fechada' : 'Esgotado'}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </section>

        {/* Footer Info */}
        <footer className="mt-16 text-center text-caramel pb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-10 h-[1px] bg-beige"></div>
            <div className="w-2 h-2 rounded-full bg-beige"></div>
            <div className="w-10 h-[1px] bg-beige"></div>
          </div>
          <p className="text-sm font-serif italic mb-2">COFFEE & CAKE - Confeitaria Artesanal</p>
          <p className="text-[10px] uppercase tracking-[0.2em]">Itaberá • São Paulo</p>
        </footer>
      </main>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-40"
        >
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-coffee-dark text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <MessageCircle size={24} />
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-coffee-dark">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <span className="font-bold uppercase tracking-wider">Pedir no WhatsApp</span>
            </div>
            <span className="text-lg font-bold">{formatCurrency(cartTotal)}</span>
          </button>
        </motion.div>
      )}

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-cream rounded-t-[32px] max-h-[90vh] overflow-hidden z-50 flex flex-col"
            >
              <div className="p-6 border-b border-beige flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold">Minha Sacola</h2>
                  <span className="bg-beige px-2 py-0.5 rounded text-xs font-bold">{cart.length} itens</span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-cream rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center bg-white p-3 rounded-2xl border border-beige/50">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <p className="text-xs text-caramel">{formatCurrency(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-cream p-1 rounded-lg">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="w-7 h-7 flex items-center justify-center text-coffee-dark hover:bg-beige rounded-md transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="w-7 h-7 flex items-center justify-center text-coffee-dark hover:bg-beige rounded-md transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                
                {cart.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-beige rounded-full flex items-center justify-center mx-auto mb-4 text-caramel">
                      <ShoppingBag size={32} />
                    </div>
                    <p className="text-caramel font-medium">Sua sacola está vazia</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 text-coffee-dark font-bold underline"
                    >
                      Voltar ao cardápio
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6 bg-white border-t border-beige space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-caramel">Total</span>
                  <span className="font-bold text-2xl">{formatCurrency(cartTotal)}</span>
                </div>
                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  disabled={cart.length === 0}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  PEDIR NO WHATSAPP
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-4 max-w-md mx-auto bg-cream rounded-[32px] z-[60] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-beige flex items-center justify-between bg-white">
                <h2 className="text-xl font-bold">Dados do Pedido</h2>
                <button onClick={() => setIsCheckoutOpen(false)} className="p-2 hover:bg-cream rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-caramel mb-2">Nome Completo</label>
                  <input 
                    type="text" 
                    value={orderDetails.name}
                    onChange={e => setOrderDetails(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Como podemos te chamar?"
                    className="w-full bg-white border border-beige p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coffee-dark transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-caramel mb-2">Tipo de Pedido</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setOrderDetails(prev => ({ ...prev, deliveryType: 'delivery' }))}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${orderDetails.deliveryType === 'delivery' ? 'border-coffee-dark bg-coffee-dark/5' : 'border-beige bg-white'}`}
                    >
                      <MessageCircle size={20} className={orderDetails.deliveryType === 'delivery' ? 'text-coffee-dark' : 'text-caramel'} />
                      <span className={`text-sm font-bold ${orderDetails.deliveryType === 'delivery' ? 'text-coffee-dark' : 'text-caramel'}`}>Entrega</span>
                    </button>
                    <button 
                      onClick={() => setOrderDetails(prev => ({ ...prev, deliveryType: 'pickup' }))}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${orderDetails.deliveryType === 'pickup' ? 'border-coffee-dark bg-coffee-dark/5' : 'border-beige bg-white'}`}
                    >
                      <ShoppingBag size={20} className={orderDetails.deliveryType === 'pickup' ? 'text-coffee-dark' : 'text-caramel'} />
                      <span className={`text-sm font-bold ${orderDetails.deliveryType === 'pickup' ? 'text-coffee-dark' : 'text-caramel'}`}>Retirada</span>
                    </button>
                  </div>
                </div>

                {orderDetails.deliveryType === 'delivery' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <label className="block text-xs font-bold uppercase tracking-wider text-caramel mb-2">Endereço de Entrega</label>
                    <textarea 
                      value={orderDetails.address}
                      onChange={e => setOrderDetails(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Rua, número, bairro e complemento"
                      rows={3}
                      className="w-full bg-white border border-beige p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coffee-dark transition-all resize-none"
                    />
                  </motion.div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-caramel mb-2">Forma de Pagamento</label>
                  <select 
                    value={orderDetails.paymentMethod}
                    onChange={e => setOrderDetails(prev => ({ ...prev, paymentMethod: e.target.value }))}
                    className="w-full bg-white border border-beige p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coffee-dark transition-all appearance-none"
                  >
                    <option value="Pix">Pix</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Cartão de Débito">Cartão de Débito</option>
                    <option value="Dinheiro">Dinheiro</option>
                  </select>
                </div>
              </div>

              <div className="p-6 bg-white border-t border-beige">
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-green-600 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-green-700 transition-colors shadow-lg"
                >
                  <MessageCircle size={24} />
                  PEDIR NO WHATSAPP
                </button>
                <p className="text-[10px] text-center text-caramel mt-4 uppercase tracking-widest font-bold">
                  Você será redirecionado para o WhatsApp
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {orderConfirmed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-coffee-dark/95 z-[100] flex items-center justify-center p-6 text-center"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-xs"
            >
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-serif text-white mb-4 italic">Pedido Enviado!</h2>
              <p className="text-beige mb-8 leading-relaxed">
                Seu pedido foi encaminhado para nossa equipe. Em instantes confirmaremos tudo com você pelo WhatsApp.
              </p>
              <button 
                onClick={() => setOrderConfirmed(false)}
                className="w-full btn-secondary"
              >
                Voltar ao Cardápio
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Closed Shop Overlay */}
      {!isShopOpen && !orderConfirmed && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-[10px] font-bold py-1.5 text-center z-[100] uppercase tracking-widest flex items-center justify-center gap-2">
          <AlertCircle size={12} />
          Loja Fechada no Momento • Abrimos às 09:00
        </div>
      )}
    </div>
  );
}
