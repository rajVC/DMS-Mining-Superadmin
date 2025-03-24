import React from 'react'
import AssignLicense from './assign-license'

const LicenseTableHeaderAciton = ({ id }: { id: number }) => {
  return (
    <div className="flex justify-end items-center gap-2 mb-4">
      <AssignLicense clientId={id} />
    </div>
  )
}

export default LicenseTableHeaderAciton