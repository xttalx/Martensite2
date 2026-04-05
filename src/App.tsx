/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { 
  CheckCircle2, 
  Home, 
  Paintbrush, 
  Sparkles, 
  Hammer, 
  ClipboardCheck, 
  Users, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin,
  ArrowRight,
  HardHat,
  Building2,
  Layout,
  Loader2
} from "lucide-react";

/** FormSubmit destination — override with VITE_FORMSUBMIT_EMAIL in `.env` */
const FORMSUBMIT_EMAIL =
  (import.meta.env.VITE_FORMSUBMIT_EMAIL as string | undefined)?.trim() ||
  "martensiteservices@gmail.com";

const SectionHeader = ({ title, subtitle, light = false }: { title: string; subtitle?: string; light?: boolean }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-slate-900'}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-lg max-w-2xl mx-auto ${light ? 'text-slate-300' : 'text-slate-600'}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const ServiceCard = ({ icon: Icon, title, description, items }: { icon: any; title: string; description: string; items: string[] }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full"
  >
    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-slate-900">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
    <p className="text-slate-600 mb-6 flex-grow">{description}</p>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-center text-sm text-slate-500">
          <CheckCircle2 size={16} className="mr-2 text-slate-400" />
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

const PackageCard = ({ name, price, description, features, highlighted = false }: { name: string; price: string; description: string; features: string[]; highlighted?: boolean }) => (
  <motion.div 
    whileHover={{ scale: highlighted ? 1.02 : 1.01 }}
    className={`p-8 rounded-3xl border ${highlighted ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-900 border-slate-200 shadow-sm'} flex flex-col h-full`}
  >
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-1 uppercase tracking-wider opacity-80">{name}</h3>
      <div className="text-3xl font-bold mb-2">{price}</div>
      <p className={`text-sm ${highlighted ? 'text-slate-400' : 'text-slate-500'}`}>{description}</p>
    </div>
    <ul className="space-y-4 mb-8 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start text-sm">
          <CheckCircle2 size={18} className={`mr-3 mt-0.5 shrink-0 ${highlighted ? 'text-slate-400' : 'text-slate-400'}`} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button className={`w-full py-4 rounded-xl font-bold transition-colors ${highlighted ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
      Select Package
    </button>
  </motion.div>
);

export default function App() {
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleContactSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setContactStatus("idle");
    setContactSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.append("_subject", "Martensite — website contact form");
    fd.append("_template", "table");

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(FORMSUBMIT_EMAIL)}`,
        {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" },
        }
      );
      const data = (await res.json().catch(() => ({}))) as { success?: string; message?: string };
      if (!res.ok || data.success === "false") {
        throw new Error(data.message || "Request failed");
      }
      form.reset();
      setContactStatus("success");
    } catch {
      setContactStatus("error");
    } finally {
      setContactSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Navigation — ad-landing friendly: services in-header + Contact us */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm shadow-slate-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-xl tracking-tight">Martensite Builders</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Martensite Lease Services Ltd.
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 min-w-0">
            <div
              className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 rounded-2xl border border-slate-200 bg-slate-50/90 px-2.5 py-2 sm:px-4 sm:py-2.5 shadow-inner shadow-white/60"
              role="navigation"
              aria-label="Core services"
            >
              <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-wider text-slate-400 pr-1">
                Services
              </span>
              <a
                href="#turnovers"
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-sm font-bold text-slate-800 bg-white border border-slate-200 shadow-sm hover:border-slate-900 hover:text-slate-900 transition-colors"
              >
                Turnover
              </a>
              <a
                href="#renovations"
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-sm font-bold text-slate-800 bg-white border border-slate-200 shadow-sm hover:border-slate-900 hover:text-slate-900 transition-colors"
              >
                Reno
              </a>
              <a
                href="#builders"
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-sm font-bold text-slate-800 bg-white border border-slate-200 shadow-sm hover:border-slate-900 hover:text-slate-900 transition-colors"
              >
                Builders
              </a>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/15 whitespace-nowrap shrink-0"
            >
              <Mail size={16} className="opacity-90" aria-hidden />
              Contact us
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
              Winnipeg & area · martensite.ca
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              Turnover, Reno &amp; Builders — <br />
              <span className="text-slate-500">One team for your property.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl"
            >
              End-of-lease make-ready, renovations, and Martensite Builders projects — built for landlords, property managers, and homeowners who need reliable results fast.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#contact" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
                Contact us — free quote
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#turnovers" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all text-center">
                Explore Turnover
              </a>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-100 -z-10 skew-x-12 translate-x-1/4 hidden lg:block" />
      </header>

      {/* Martensite Builders Section - NEW SECTION */}
      <section id="builders" className="py-32 bg-slate-900 text-white overflow-hidden relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920" 
            alt="Modern construction" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-slate-300 text-sm font-medium mb-6 backdrop-blur-sm">
                <HardHat size={14} />
                Trademark: Martensite Builders™
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                We Build & Improve <br />
                <span className="text-slate-400">Living Spaces.</span>
              </h2>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Beyond turnovers, Martensite Builders specializes in structural improvements and new builds. Whether it's a basement development, a custom addition, or a full home transformation, we bring precision engineering to every project.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                {[
                  { title: "Custom Home Additions", desc: "Expanding your footprint with seamless structural extensions." },
                  { title: "Basement Developments", desc: "Transforming raw space into functional living areas." },
                  { title: "Structural Improvements", desc: "Reinforcing and modernizing the core of your home." },
                  { title: "New Builds", desc: "From foundation to finish, we build with lasting quality." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm">
                      <CheckCircle2 className="text-slate-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-xl shadow-white/10">
                Learn About Builders
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Turnover Services Section */}
      <section id="turnovers" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title="End-of-Lease Turnovers" 
            subtitle="Everything you need to get your property back on the market quickly and in pristine condition."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard 
              icon={Sparkles}
              title="Deep Cleaning"
              description="Comprehensive cleaning from ceiling to floor, ensuring every corner is spotless."
              items={["Appliances", "Windows & Tracks", "Carpets & Floors", "Sanitization"]}
            />
            <ServiceCard 
              icon={Paintbrush}
              title="Professional Painting"
              description="Fresh coats and touch-ups to revitalize the interior and cover wear and tear."
              items={["Full Room Painting", "Trim & Baseboards", "Ceiling Refreshes", "Color Matching"]}
            />
            <ServiceCard 
              icon={Hammer}
              title="Damage Repairs"
              description="Fixing the small and large issues left behind by previous tenants."
              items={["Drywall Repair", "Fixture Replacement", "Cabinet Adjustments", "Door Repairs"]}
            />
            <ServiceCard 
              icon={ClipboardCheck}
              title="Property Inspections"
              description="Detailed reports on property condition to protect your investment."
              items={["Move-out Reports", "Damage Assessment", "Safety Checks", "Photo Documentation"]}
            />
          </div>
        </div>
      </section>

      {/* Renovation Section */}
      <section id="renovations" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center mb-20">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6">Transform Your Space: Professional Renovation</h2>
              <p className="text-lg text-slate-600 mb-8">
                We don't just fix things; we elevate them. Our renovation team specializes in modernizing properties to increase value and appeal.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-900">
                    <Layout size={20} />
                  </div>
                  <span className="font-medium">Kitchen & Bath</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-900">
                    <Home size={20} />
                  </div>
                  <span className="font-medium">Flooring & Trim</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-900">
                    <Sparkles size={20} />
                  </div>
                  <span className="font-medium">Lighting & Fixtures</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-900">
                    <Building2 size={20} />
                  </div>
                  <span className="font-medium">Full Home Refresh</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=500" 
                alt="Kitchen renovation" 
                className="rounded-2xl h-64 w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=500" 
                alt="Bathroom renovation" 
                className="rounded-2xl h-64 w-full object-cover mt-8"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <SectionHeader 
            title="Renovation Packages" 
            subtitle="Transparent pricing for every level of property transformation."
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            <PackageCard 
              name="Basic Finish"
              price="Custom Quote"
              description="Essential updates for a clean, modern look."
              features={[
                "Professional Interior Painting",
                "Deep Cleaning Service",
                "Minor Drywall & Trim Repairs",
                "Fixture Updates (Standard)",
                "Full Move-out Inspection"
              ]}
            />
            <PackageCard 
              name="Standard Renovation"
              price="Custom Quote"
              description="Significant upgrades to key living areas."
              highlighted={true}
              features={[
                "Everything in Basic Finish",
                "New Luxury Vinyl Plank Flooring",
                "Kitchen Cabinet Refacing",
                "New Countertops (Laminate/Quartz)",
                "Updated Lighting Package"
              ]}
            />
            <PackageCard 
              name="Full Reno"
              price="Custom Quote"
              description="Complete property overhaul and modernization."
              features={[
                "Everything in Standard Reno",
                "Full Kitchen & Bath Remodel",
                "Structural Modifications",
                "New Doors & Trim Throughout",
                "Premium Appliance Installation"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6">Who We Serve</h2>
              <p className="text-lg text-slate-400 mb-8">
                We partner with property professionals to ensure their investments are always looking their best and generating maximum return.
              </p>
              <div className="flex flex-wrap gap-4">
                {["Property Managers", "Landlords", "Real Estate Agents", "Homeowners"].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <Users className="text-slate-400 mb-4" size={32} />
                <h4 className="font-bold mb-2">Dedicated Teams</h4>
                <p className="text-sm text-slate-500">Reliable crews that know your property standards.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <ClipboardCheck className="text-slate-400 mb-4" size={32} />
                <h4 className="font-bold mb-2">Quality Control</h4>
                <p className="text-sm text-slate-500">Rigorous inspections after every single job.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
              <p className="text-lg text-slate-600 mb-10">
                Get in touch today for a free, no-obligation quote. Our team is ready to help you with your next turnover, renovation, or build project.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-900">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email Us</p>
                    <p className="font-bold">martensiteservices@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-900">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="font-bold">Winnipeg, MB</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <form className="space-y-6" onSubmit={handleContactSubmit} noValidate>
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-sm font-medium text-slate-700">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                      placeholder="John Doe"
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                      placeholder="john@example.com"
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-project" className="text-sm font-medium text-slate-700">
                    Project Type
                  </label>
                  <select
                    id="contact-project"
                    name="project"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                  >
                    <option value="">Select a project type</option>
                    <option>End-of-Lease Turnover</option>
                    <option>Martensite Builders Project</option>
                    <option>Residential Renovation</option>
                    <option>Commercial Service</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                    placeholder="Tell us about your project..."
                  />
                </div>
                {contactStatus === "success" && (
                  <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                    Thanks — your message was sent. We will get back to you soon.
                  </p>
                )}
                {contactStatus === "error" && (
                  <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={contactSubmitting}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  {contactSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-base tracking-tight">Martensite Builders</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Martensite Lease Services Ltd.</span>
            </div>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 Martensite Lease Services Ltd. & Martensite Builders™. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><ChevronRight size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><ChevronRight size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
