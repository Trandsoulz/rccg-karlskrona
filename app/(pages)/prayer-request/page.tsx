'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const prayerRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters').max(15, 'Phone number is too long'),
  prayerRequest: z.string().min(10, 'Please provide more details (at least 10 characters)').max(1000, 'Prayer request is too long')
})

type PrayerRequestFormData = z.infer<typeof prayerRequestSchema>

const PrayerRequest = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PrayerRequestFormData>({
    resolver: zodResolver(prayerRequestSchema)
  })

  const onSubmit = async (data: PrayerRequestFormData) => {
    setIsSubmitting(true)
    
    try {
      const formData = new FormData()
      formData.append("access_key", process.env.NEXT_PUBLIC_FORM_KEY || "")
      formData.append("name", data.name)
      formData.append("email", data.email)
      formData.append("phoneNumber", data.phoneNumber)
      formData.append("prayerRequest", data.prayerRequest)

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        setSubmitSuccess(true)
        reset()
        
        // Hide success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        console.error('Form submission failed:', result)
        alert('Failed to submit prayer request. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting prayer request:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-white dark:bg-slate-900 pt-20">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-slate-100">
            Prayer Request
          </h1>
          <p className="text-md md:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
            We believe in the power of prayer and are here to support you in your spiritual journey. 
            Please fill out the form below to submit your prayer request. Our prayer team will lift 
            your needs before God with faith and compassion.
          </p>
        </div>

        <Card className="shadow-xl border-slate-200 dark:border-slate-700 pt-0">
          <CardHeader className="bg-slate-50 dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700">
            <CardTitle className="text-2xl py-6 text-slate-900 dark:text-slate-100">
              Submit Your Prayer Request
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg 
                           bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-colors duration-200"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg 
                           bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-colors duration-200"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone Number Field */}
              <div>
                <label 
                  htmlFor="phoneNumber" 
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  {...register('phoneNumber')}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg 
                           bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-colors duration-200"
                  placeholder="+46 70 123 45 67"
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Prayer Request Field */}
              <div>
                <label 
                  htmlFor="prayerRequest" 
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Your Prayer Request <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="prayerRequest"
                  rows={6}
                  {...register('prayerRequest')}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg 
                           bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-colors duration-200 resize-y"
                  placeholder="Please share your prayer request with us. We will pray for you..."
                />
                {errors.prayerRequest && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.prayerRequest.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700
                           text-white font-semibold py-6 rounded-lg
                           transition-all duration-300 transform hover:scale-[1.02]
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Prayer Request'
                  )}
                </Button>
              </div>

              {/* Success Message */}
              {submitSuccess && (
                <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 text-center font-medium">
                    ✓ Your prayer request has been submitted successfully. Our prayer team will pray for you.
                  </p>
                </div>
              )}
            </form>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                &quot;The prayer of a righteous person is powerful and effective.&quot; - James 5:16
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>

    <Footer />
    </>
  )
}

export default PrayerRequest
