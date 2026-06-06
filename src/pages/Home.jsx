import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Gauge,
  Globe2,
  Headphones,
  Layers3,
  LockKeyhole,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  WalletCards,
  Zap,
} from 'lucide-react'

const features = [
  {
    title: 'Transparent Company',
    text: 'A clean investor area that clearly shows the user profile, active plan, invested amount, and account status.',
    icon: Building2,
  },
  {
    title: 'High Reliability',
    text: 'A lightweight platform structure designed for a small private investor community with fast loading pages.',
    icon: LockKeyhole,
  },
  {
    title: 'Privacy-Focused Access',
    text: 'Users login to view only their own account information while admin manages investment records separately.',
    icon: UserCheck,
  },
  {
    title: 'Quick Account Updates',
    text: 'Admin can update invested amount, plan name, and status so users can view their latest dashboard details.',
    icon: Zap,
  },
  {
    title: 'Investor Community',
    text: 'Built for a focused group of users, making the platform easy to manage, monitor, and improve over time.',
    icon: Users,
  },
  {
    title: 'Support Ready',
    text: 'Contact and support sections are prepared so visitors can ask questions before creating an account.',
    icon: Headphones,
  },
]

const plans = [
  {
    name: 'Starter Plan',
    amount: '$250+',
    description: 'For new members who need a simple account display and clear investment tracking.',
    points: ['Private login', 'Dashboard display', 'Admin-updated status'],
  },
  {
    name: 'Growth Plan',
    amount: '$1,000+',
    description: 'A stronger profile layout for active investors who want a premium dashboard view.',
    points: ['Plan details', 'Investment records', 'Priority account view'],
    highlight: true,
  },
  {
    name: 'Prime Plan',
    amount: '$5,000+',
    description: 'Designed for selected members with a higher-level investment account presentation.',
    points: ['Premium profile card', 'Status tracking', 'Admin management'],
  },
]

const stats = [
  { label: 'Investor portal', value: '24/7', icon: Gauge },
  { label: 'Dashboard style', value: 'Premium', icon: Sparkles },
  { label: 'Backend ready', value: 'Supabase', icon: Layers3 },
  { label: 'Small community', value: '10+ / mo', icon: Users },
]

export default function Home() {
  return (
    <main className="overflow-hidden bg-black text-white">
      <section id="home" className="hero-lux relative min-h-[760px] overflow-hidden px-6 py-20 lg:px-10">
        <div className="star-layer" />
        <div className="absolute -left-20 top-24 h-96 w-96 rounded-full bg-helios-gold/10 blur-3xl" />
        <div className="absolute right-0 top-12 h-[34rem] w-[34rem] rounded-full bg-helios-green/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-helios-blue/10 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-2xl py-10">
            <p className="mb-6 inline-flex items-center gap-2 rounded-md border border-helios-gold/30 bg-helios-gold/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-helios-gold">
              <Rocket size={16} /> Complete DeFi Investment System
            </p>

            <h1 className="font-display text-5xl font-black leading-[1.08] tracking-wide sm:text-6xl lg:text-7xl">
              Invest for Future in Stable Platform
              <span className="mt-4 block gold-text-large">with Helios DeFi</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-white/76">
              Helios DeFi is a premium digital investment dashboard created for modern investors who need a secure,
              simple, and professional way to view their account. Create an account, login, and see your invested amount,
              plan details, and current account status from one clean portal.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/register" className="btn-gold inline-flex items-center justify-center gap-2">
                SIGN UP <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn-outline-gold inline-flex items-center justify-center gap-2">
                LOGIN <ShieldCheck size={18} />
              </Link>
            </div>
          </div>

          <div className="relative hidden min-h-[560px] lg:block">
            <div className="orbit-ring orbit-one" />
            <div className="orbit-ring orbit-two" />
            <div className="gold-coin hero-coin"><span>H</span></div>
            <div className="floating-card card-one">
              <BarChart3 className="text-helios-gold" />
              <div>
                <p className="text-sm text-white/50">Portfolio display</p>
                <p className="font-black">Live account view</p>
              </div>
            </div>
            <div className="floating-card card-two">
              <WalletCards className="text-helios-green" />
              <div>
                <p className="text-sm text-white/50">Investment amount</p>
                <p className="font-black gold-gradient-text">Admin updated</p>
              </div>
            </div>
            <div className="floating-card card-three">
              <TrendingUp className="text-helios-blue" />
              <div>
                <p className="text-sm text-white/50">Dashboard status</p>
                <p className="font-black">Active / Pending</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about-lux relative overflow-hidden border-t border-white/10 px-6 py-24 lg:px-10">
        <div className="coin-sparkles" />
        <div className="relative z-10 mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex justify-center lg:justify-start">
            <div className="large-coin"><span>₿</span></div>
          </div>

          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-helios-gold">About Us</p>
            <h2 className="text-4xl font-black sm:text-5xl">
              About <span className="gold-gradient-text">Helios DeFi</span>
            </h2>
            <p className="mt-8 text-lg leading-9 text-white/76">
              Helios DeFi is a digital finance brand focused on professional investment account presentation. The
              platform is designed for a private group of users who need a simple dashboard to view account information,
              invested amount, plan type, and current status.
            </p>
            <p className="mt-5 text-lg leading-9 text-white/70">
              Our goal is to provide a premium frontend experience with clear navigation, strong visual branding, and a
              backend-ready structure. The system is prepared for Supabase authentication and database records, making it
              easy to manage investors without building a complicated application.
            </p>
            <Link to="/register" className="btn-gold mt-9 inline-flex items-center justify-center gap-2">
              MORE INFO <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="feature-lux relative overflow-hidden px-6 py-24 lg:px-10">
        <div className="falling-coins" />
        <div className="relative z-10 mx-auto max-w-[1500px]">
          <div className="mx-auto mb-14 max-w-4xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-helios-gold">Why choose us</p>
            <h2 className="mt-4 text-4xl font-black sm:text-5xl">Professional features for a trusted investment website.</h2>
            <p className="mt-6 text-lg leading-8 text-white/68">
              The layout is made to look premium like a serious investment platform, while keeping the wording realistic,
              safe, and suitable for a DeFi dashboard project.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <article key={feature.title} className="feature-box group">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="feature-icon">
                      <Icon size={31} />
                    </div>
                    <h3 className="text-2xl font-black text-helios-gold">{feature.title}</h3>
                  </div>
                  <p className="text-lg leading-8 text-white/76">{feature.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="plans" className="relative overflow-hidden border-y border-white/10 bg-[#050505] px-6 py-24 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,178,60,0.10),transparent_38rem)]" />
        <div className="relative z-10 mx-auto max-w-[1500px]">
          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-helios-gold">Investment plans</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black sm:text-5xl">Choose a plan display for your account dashboard.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-white/64">
              These plan cards are frontend content. You can edit names, minimum amounts, and descriptions anytime from
              the code or later connect them to your backend.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.name} className={`pricing-card ${plan.highlight ? 'pricing-card-highlight' : ''}`}>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-white/45">{plan.name}</p>
                <p className="mt-5 text-5xl font-black gold-gradient-text">{plan.amount}</p>
                <p className="mt-5 min-h-[84px] text-lg leading-8 text-white/66">{plan.description}</p>
                <div className="mt-8 space-y-4">
                  {plan.points.map((point) => (
                    <p key={point} className="flex items-center gap-3 text-white/76">
                      <CheckCircle2 className="text-helios-gold" size={20} /> {point}
                    </p>
                  ))}
                </div>
                <Link to="/register" className="btn-gold mt-9 inline-flex w-full items-center justify-center gap-2">
                  Join Plan <ArrowRight size={18} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="insights" className="relative overflow-hidden bg-black px-6 py-24 lg:px-10">
        <div className="star-layer opacity-60" />
        <div className="relative z-10 mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="dashboard-preview">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-white/40">Investor Dashboard</p>
                <h3 className="mt-2 text-3xl font-black gold-gradient-text">Account Overview</h3>
              </div>
              <span className="rounded-full border border-helios-green/30 bg-helios-green/10 px-4 py-2 text-sm font-bold text-helios-green">Active</span>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/35 p-7">
              <p className="text-sm text-white/45">Invested amount</p>
              <p className="mt-2 text-6xl font-black gold-gradient-text">$5,000</p>
              <p className="mt-3 text-white/58">Growth Plan · Updated by admin</p>
              <div className="mt-7 h-3 rounded-full bg-white/10">
                <div className="h-3 w-4/5 rounded-full bg-gradient-to-r from-helios-gold via-helios-green to-helios-blue" />
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <Icon className="mb-4 text-helios-gold" size={24} />
                    <p className="text-2xl font-black text-white">{stat.value}</p>
                    <p className="mt-1 text-sm text-white/48">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-helios-gold">Platform summary</p>
            <h2 className="mt-4 text-4xl font-black sm:text-5xl">Built to look premium and stay easy to manage.</h2>
            <p className="mt-6 text-lg leading-9 text-white/68">
              This website is focused on frontend quality: a luxury dark theme, gold investment style, strong spacing,
              modern dashboard cards, and a clean user journey. The backend can be connected through Supabase for real
              authentication and stored investment records.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="info-tile">
                <Globe2 className="text-helios-gold" />
                <p>Domain ready for GoDaddy connection</p>
              </div>
              <div className="info-tile">
                <ShieldCheck className="text-helios-green" />
                <p>Realistic disclaimer and safer wording</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden px-6 py-24 lg:px-10">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,178,60,0.14),transparent_35%,rgba(0,208,132,0.12))]" />
        <div className="relative z-10 mx-auto max-w-[1200px] rounded-[2rem] border border-helios-gold/30 bg-black/70 p-8 text-center shadow-gold backdrop-blur-xl sm:p-14">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-helios-gold">Start now</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            Create your Helios DeFi account and view your private investment dashboard.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/64">
            Login, registration, user dashboard, admin panel, and Supabase setup files are included in this project.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/register" className="btn-gold inline-flex items-center justify-center gap-2">
              Create Account <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-outline-gold inline-flex items-center justify-center gap-2">
              Login Dashboard <WalletCards size={18} />
            </Link>
          </div>
          <p className="mx-auto mt-9 max-w-4xl text-sm leading-7 text-white/46">
            Disclaimer: Helios DeFi provides investment account tracking and dashboard information only. Digital assets
            and DeFi investments involve risk. Returns are not guaranteed. This website content is not financial advice.
          </p>
        </div>
      </section>
    </main>
  )
}
