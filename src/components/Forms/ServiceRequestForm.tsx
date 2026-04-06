'use client'

import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Wrench, X, Upload } from 'lucide-react'
import {
  getRepairRequestOptions,
  submitRepairRequest,
  type RepairRequestOptionService,
  type RepairRequestOptionVehicleModel,
} from '@/Services/repairService'

export function ServiceRequestForm({ show, onClose }: { show: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    phone: '',
    numberPlate: '',
    vehicleBrand: '',
    vehicleModelId: '',
    serviceId: '',
    serviceDate: '',
    serviceTime: '',
    repairIssue: '',
  })

  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingOptions, setIsLoadingOptions] = useState(false)
  const [hasLoadedOptions, setHasLoadedOptions] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [vehicleModels, setVehicleModels] = useState<RepairRequestOptionVehicleModel[]>([])
  const [services, setServices] = useState<RepairRequestOptionService[]>([])

  useEffect(() => {
    if (!show || hasLoadedOptions) return

    const loadOptions = async () => {
      setIsLoadingOptions(true)
      try {
        const options = await getRepairRequestOptions()
        setVehicleModels(options.vehicleModels)
        setServices(options.services)
        setHasLoadedOptions(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load form options')
      } finally {
        setIsLoadingOptions(false)
      }
    }

    void loadOptions()
  }, [show, hasLoadedOptions])

  const brandOptions = useMemo(() => {
    return Array.from(new Set(vehicleModels.map((item) => item.brandName).filter(Boolean))).sort((a, b) =>
      a.localeCompare(b)
    )
  }, [vehicleModels])

  const filteredVehicleModels = useMemo(() => {
    if (!formData.vehicleBrand) return []
    return vehicleModels.filter((item) => item.brandName === formData.vehicleBrand)
  }, [vehicleModels, formData.vehicleBrand])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => {
      if (name === 'vehicleBrand') {
        return {
          ...prev,
          vehicleBrand: value,
          vehicleModelId: '',
        }
      }
      return {
        ...prev,
        [name]: value,
      }
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
    setSuccess(false)

    try {
      const selectedVehicleModel = vehicleModels.find(
        (item) => item.id === Number(formData.vehicleModelId)
      )

      if (!selectedVehicleModel) {
        throw new Error('Please select a valid vehicle model.')
      }

      await submitRepairRequest({
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        numberPlate: formData.numberPlate,
        vehicleBrand: formData.vehicleBrand,
        vehicleModelName: selectedVehicleModel.name,
        vehicleModelId: Number(formData.vehicleModelId),
        serviceId: formData.serviceId ? Number(formData.serviceId) : undefined,
        repairIssue: formData.repairIssue,
      })

      setSuccess(true)
      setFormData({
        contactName: '',
        email: '',
        phone: '',
        numberPlate: '',
        vehicleBrand: '',
        vehicleModelId: '',
        serviceId: '',
        serviceDate: '',
        serviceTime: '',
        repairIssue: '',
      })
      setPreviewImages([])
    } catch (err) {
      console.error('Repair request failed:', err)

      setError(`Failed to submit request: ${err instanceof Error ? err.message : 'Please check connection'}`)
    }

    setIsSubmitting(false)
  }

  if (!show) return null

  const inputStyle =
    'w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none bg-white text-black placeholder-gray-500 focus:border-[#c29958] focus:ring-2 focus:ring-[#c29958]/20'

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
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

        {isLoadingOptions && (
          <div className="mb-4 text-sm text-gray-600">Loading live options from Odoo...</div>
        )}

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

              <input
                type="text"
                name="numberPlate"
                placeholder="Vehicle Number Plate"
                required
                value={formData.numberPlate}
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
                disabled={isLoadingOptions}
                className={inputStyle}
              >
                <option value="">Select Vehicle Brand</option>
                {brandOptions.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>

              <select
                name="vehicleModelId"
                value={formData.vehicleModelId}
                onChange={handleChange}
                required
                disabled={!formData.vehicleBrand || isLoadingOptions}
                className={inputStyle}
              >
                <option value="">Select Vehicle Model</option>
                {filteredVehicleModels.map((item) => (
                  <option key={item.id} value={String(item.id)}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select
                name="serviceId"
                value={formData.serviceId}
                onChange={handleChange}
                disabled={isLoadingOptions}
                className={inputStyle}
              >
                <option value="">Select Service (Optional)</option>
                {services.map((item) => (
                  <option key={item.id} value={String(item.id)}>
                    {item.name}
                  </option>
                ))}
              </select>
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
                  <Image
                    key={index}
                    src={img}
                    alt={`Uploaded damage preview ${index + 1}`}
                    width={160}
                    height={80}
                    unoptimized
                    className="rounded-md object-cover h-20 w-full"
                  />
                ))}
              </div>
            )}
          </div>

          {success && (
            <div className="text-green-600 text-sm">Service request submitted successfully.</div>
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
