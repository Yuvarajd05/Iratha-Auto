export async function submitRepairRequest(data: any) {
  const formData = new FormData()

  // fields expected by Odoo controller (must be numeric strings for IDs)
  formData.append('contact_name', data.contactName)
  formData.append('email', data.email)
  formData.append('phone', data.phone)

  // Odoo expects IDs (integers) for these fields
  // For now using '1' as placeholder until dynamic IDs are implemented
  formData.append('vehicle_model', '1')
  formData.append('service', '1')
  formData.append('service_type', '3')

  formData.append('repair_issue', data.repairIssue || '')
  formData.append('repair_reason', 'Website Request')
  formData.append('demage', `Brand: ${data.vehicleBrand}, Model: ${data.vehicleModel}`)

  try {
    const response = await fetch('http://127.0.0.1:8069/repair_request', {
      method: 'POST',
      body: formData
      // Note: browser automatically sets Content-Type to multipart/form-data with boundary
    })

    return response
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
