"use client"
 
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wrench } from "lucide-react"
 
export function ServiceRequestForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    contactName: "",
    email: "",
    phone: "",
    vehicleModel: "",
    serviceType: "",
    repairIssue: "",
  })
 
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setSuccess(false)
 
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
 
      setSuccess(true)
      setFormData({
        contactName: "",
        email: "",
        phone: "",
        vehicleModel: "",
        serviceType: "",
        repairIssue: "",
      })
    } catch {
      setError("Failed to submit request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
 
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white text-black w-[95%] max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 relative shadow-2xl">
 
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-xl font-bold"
        >
          ✕
        </button>
 
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-[#c29958]/10 rounded-lg">
            <Wrench className="w-6 h-6 text-[#c29958]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b3c]">
            Repair / Service Request
          </h2>
        </div>
 
        <form onSubmit={handleSubmit} className="space-y-8">
 
          {/* Personal Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Personal Information
            </h3>
 
            <div className="space-y-4">
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="w-full px-4 py-3 border rounded-lg text-black placeholder:text-gray-400 focus:border-[#c29958] focus:ring-2 focus:ring-[#c29958]/20 outline-none"
              />
 
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-lg text-black placeholder:text-gray-400 focus:border-[#c29958] focus:ring-2 focus:ring-[#c29958]/20 outline-none"
              />
 
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Phone"
                className="w-full px-4 py-3 border rounded-lg text-black placeholder:text-gray-400 focus:border-[#c29958] focus:ring-2 focus:ring-[#c29958]/20 outline-none"
              />
            </div>
          </div>
 
          {/* Vehicle Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Vehicle Information
            </h3>
 
            <div className="space-y-4">
              <select
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg bg-white text-black focus:border-[#c29958] focus:ring-2 focus:ring-[#c29958]/20 outline-none"
              >
                <option value="">Select Vehicle Model</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="truck">Truck</option>
              </select>
 
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg bg-white text-black focus:border-[#c29958] focus:ring-2 focus:ring-[#c29958]/20 outline-none"
              >
                <option value="">Select Service Type</option>
                <option value="maintenance">Maintenance</option>
                <option value="repair">Repair</option>
              </select>
 
              <textarea
                name="repairIssue"
                value={formData.repairIssue}
                onChange={handleChange}
                rows={4}
                placeholder="Describe the issue..."
                className="w-full px-4 py-3 border rounded-lg text-black placeholder:text-gray-400 focus:border-[#c29958] focus:ring-2 focus:ring-[#c29958]/20 outline-none resize-none"
              />
            </div>
          </div>
 
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
 
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              Request submitted successfully!
            </div>
          )}
 
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#c29958] hover:bg-[#b08948] text-white py-6 text-lg rounded-lg"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </div>
    </div>
  )
}
 