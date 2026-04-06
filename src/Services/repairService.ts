export interface RepairRequestOptionVehicleModel {
  id: number
  name: string
  brandId: number | null
  brandName: string
  label: string
}

export interface RepairRequestOptionService {
  id: number
  name: string
  isActive: boolean
}

export interface RepairRequestOptionsResponse {
  vehicleModels: RepairRequestOptionVehicleModel[]
  services: RepairRequestOptionService[]
}

export interface RepairRequestSubmitPayload {
  contactName: string
  email: string
  phone: string
  vehicleBrand: string
  vehicleModelName: string
  vehicleModelId: number
  serviceId?: number
  numberPlate: string
  repairIssue?: string
}

interface ApiResponse<T> {
  success: boolean
  error?: string
  message?: string
  data?: T
}

export async function getRepairRequestOptions(): Promise<RepairRequestOptionsResponse> {
  const response = await fetch('/api/odoo/repair-request/options', {
    method: 'GET',
    cache: 'no-store',
  })

  const json = (await response.json()) as ApiResponse<RepairRequestOptionsResponse>
  if (!response.ok || !json.success || !json.data) {
    throw new Error(json.error || 'Failed to load repair form options.')
  }

  return json.data
}

export async function submitRepairRequest(
  payload: RepairRequestSubmitPayload
): Promise<{ leadId: number }> {
  const response = await fetch('/api/odoo/repair-request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const json = (await response.json()) as ApiResponse<{ leadId: number }>
  if (!response.ok || !json.success || !json.data) {
    throw new Error(json.error || 'Failed to submit repair request.')
  }

  return json.data
}
