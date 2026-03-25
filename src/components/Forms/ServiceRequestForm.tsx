'use client'

import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Wrench, X, Upload } from 'lucide-react'
import { submitRepairRequest } from '@/Services/repairService'

export function ServiceRequestForm({ show, onClose }: { show: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    phone: '',
    vehicleBrand: '',
    otherBrand: '',
    vehicleModel: '',
    serviceDate: '',
    serviceTime: '',
    repairIssue: ''
  })

  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const previews = files.map((file) => URL.createObjectURL(file))
    setPreviewImages(previews)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    setError('')

    try {
      const response = await submitRepairRequest(formData)

      if (!response.ok) {
        throw new Error('Server error')
      }

      setSuccess(true)

      setTimeout(() => {
        window.location.href = 'http://localhost:8069/request-thank-you'
      }, 1200)
    } catch (err) {
      console.error('Repair request failed:', err)

      setError('Failed to submit request. Please try again.')
    }

    setIsSubmitting(false)
  }

  if (!show) return null

  const inputStyle =
    'w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none bg-white text-black placeholder-gray-500 focus:border-[#c29958] focus:ring-2 focus:ring-[#c29958]/20'

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X size={22} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#c29958]/10 rounded-lg">
            <Wrench className="w-5 h-5 text-[#c29958]" />
          </div>

          <h2 className="text-2xl font-bold text-[#1a2b3c]">Repair / Service Request</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PERSONAL */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#1a2b3c]">Personal Information</h3>

            <div className="space-y-3">
              <input
                type="text"
                name="contactName"
                placeholder="Full Name"
                required
                value={formData.contactName}
                onChange={handleChange}
                className={inputStyle}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                className={inputStyle}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
          </div>

          {/* VEHICLE */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#1a2b3c]">Vehicle Information</h3>

            <div className="space-y-3">
              <select
                name="vehicleBrand"
                value={formData.vehicleBrand}
                onChange={handleChange}
                required
                className={inputStyle}
              >
                <option value="">Select Vehicle Brand</option>
                <option>BMW</option>
                <option>Mercedes</option>
                <option>Audi</option>
                <option>Toyota</option>
                <option>Honda</option>
                <option>Hyundai</option>
                <option value="Other">Other</option>
              </select>

              {formData.vehicleBrand === 'Other' && (
                <input
                  type="text"
                  name="otherBrand"
                  placeholder="Enter Vehicle Brand"
                  required
                  value={formData.otherBrand}
                  onChange={handleChange}
                  className={inputStyle}
                />
              )}

              <input
                type="text"
                name="vehicleModel"
                placeholder="Vehicle Model"
                value={formData.vehicleModel}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
          </div>

          {/* SCHEDULE */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#1a2b3c]">Service Schedule</h3>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                name="serviceDate"
                value={formData.serviceDate}
                onChange={handleChange}
                required
                className={inputStyle}
              />

              <input
                type="time"
                name="serviceTime"
                value={formData.serviceTime}
                onChange={handleChange}
                required
                className={inputStyle}
              />
            </div>
          </div>

          <textarea
            name="repairIssue"
            rows={3}
            placeholder="Describe the issue or service required..."
            value={formData.repairIssue}
            onChange={handleChange}
            className={inputStyle}
          />

          {/* UPLOAD */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#1a2b3c]">Upload Damage Photos</h3>

            <label className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-5 cursor-pointer hover:border-[#c29958] transition">
              <Upload className="mr-2 text-[#c29958]" />

              <span className="text-gray-600 text-sm">Upload Photos</span>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>

            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {previewImages.map((img, index) => (
                  <img key={index} src={img} className="rounded-md object-cover h-20 w-full" />
                ))}
              </div>
            )}
          </div>

          {success && (
            <div className="text-green-600 text-sm">Service request submitted successfully!</div>
          )}

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#c29958] hover:bg-[#b08948] text-white py-4"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </form>
      </div>
    </div>
  )
}
