import React from 'react'
import CreateUniversityForm from './create-univeristy'

const UniversityListHeaderAction = () => {
    return (
        <div className="flex justify-end items-center gap-2 mb-4">
            <CreateUniversityForm />
        </div>
    )
}

export default UniversityListHeaderAction