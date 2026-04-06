'use server'

import { callOdoo } from '@/lib/odooClient'

export async function submitRepairRequest(data: any): Promise<any> {
  const params = {
    contact_name: data.contactName,
    email: data.email,
    phone: data.phone,
    vehicle_model: 1, // Placeholder integer IDs
    service: 1,
    service_type: 3,
    repair_issue: data.repairIssue || '',
    repair_reason: 'Website Request',
    demage: `Brand: ${data.vehicleBrand}, Model: ${data.vehicleModel}`,
    number_plate: data.number_plate, // Ensure this is passed if available
    meter_reading: data.meter_reading,
  }

  try {
    const response = await callOdoo({
      endpoint: '/repair_request',
      params,
    })

    return response.result
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
