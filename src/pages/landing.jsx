'use client'

import { useState } from 'react'
import { Dialog, DialogPanel,Field, Label, Switch } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import ContactForm from "../components/contactForm";
import { ChevronDownIcon } from '@heroicons/react/16/solid'
const navigation = [
  { name: 'How it works', href: '#how-it-works' },
  
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#form' },
]

export default function Example() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        country: 'US',
        phoneNumber: '',
      })
      
      const [isSubmitting, setIsSubmitting] = useState(false)
      const [submitted, setSubmitted] = useState(false)
      const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
      }
      const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
      
        try {
          // Replace this with actual API call if needed
          await new Promise((res) => setTimeout(res, 1500))
          setSubmitted(true)
        } catch (err) {
          console.error('Submission failed', err)
        } finally {
          setIsSubmitting(false)
        }
      }
                  
    const [agreed, setAgreed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Global pink gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-[-200px] left-1/2 transform -translate-x-1/2 rotate-[30deg] w-[72rem] h-[72rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 blur-3xl"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
        <div
          className="absolute top-[80%] left-1/2 transform -translate-x-1/2 rotate-[30deg] w-[72rem] h-[72rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 blur-3xl"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">QRMenu</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt="QRMenu Logo"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/login" className="text-sm font-semibold text-gray-900">
              Log in <span aria-hidden="true">→</span>
            </a>
          </div>
        </nav>
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-white px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">QRMenu</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  alt="QRMenu Logo"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* HERO Section */}
      <main>
        <div className="relative py-24 sm:py-32 z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              QR Menus for Modern Dining
            </h1>
            <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl/8">
              Create stylish, interactive QR menus for your restaurant or café. No app downloads. Easy to update. Loved by customers.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#form"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Join the Waitlist
              </a>
              <a href="#how-it-works" className="text-sm font-semibold text-gray-900">
                See how it works <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* How it works */}
        <section id="how-it-works" className="relative py-24 sm:py-32 z-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">How it works</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Create your digital menu in minutes
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Skip the hassle of printing and updating physical menus. Our platform simplifies everything from setup to publishing your live QR menu.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: '1. Sign up & upload logo', desc: 'Create your brand profile and upload your branding.' },
                { title: '2. Add menu sections & items', desc: 'Easily add categories like Drinks, Appetizers, and more.' },
                { title: '3. Publish & share QR', desc: 'Your menu is live instantly. Share it on tables, boards, or websites.' },
              ].map((step, i) => (
                <div key={i} className="bg-white bg-opacity-80 p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="relative py-24 sm:py-32 z-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Simple, transparent pricing</p>
            <p className="mt-6 text-lg text-gray-600">Start free, scale as you grow.</p>
            <div className="mt-16 flex flex-col items-center sm:flex-row sm:justify-center gap-8">
              <div className="rounded-xl bg-white bg-opacity-90 shadow-lg p-8 w-full max-w-sm">
                <h3 className="text-2xl font-semibold text-gray-900">Starter</h3>
                <p className="mt-4 text-gray-600">Perfect for small cafes & food trucks.</p>
                <p className="mt-6 text-4xl font-bold text-gray-900">$20<span className="text-base font-medium">/mo</span></p>
                <ul className="mt-6 text-sm text-gray-600 space-y-2 text-left">
                  <li>✔ 1 Menu</li>
                  <li>✔ 50 items</li>
                  <li>✔ QR download</li>
                </ul>
              </div>
              <div className="rounded-xl bg-indigo-600 text-white shadow-xl p-8 w-full max-w-sm">
                <h3 className="text-2xl font-semibold">Pro</h3>
                <p className="mt-4">For growing restaurants & chains.</p>
                <p className="mt-6 text-4xl font-bold">$18<span className="text-base font-medium">/mo X number of QR's</span></p>
                <ul className="mt-6 text-sm space-y-2 text-left">
                  <li>✔ Unlimited menus</li>
                  <li>✔ Menu analytics</li>
                  <li>✔ Priority support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="relative py-24 z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Loved by restaurant owners</h2>
            <p className="mt-4 text-lg text-gray-600">See what others are saying about the platform.</p>
          </div>
        </section>
        <section id="form">
        <ContactForm/>
        </section>
      </main>
    </div>
  )
}
