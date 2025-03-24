import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'
import AssignLicense from './assign-license'
import { Eye, FileClock, MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import DeleteUniversityPopup from './delete-university'

const UniveristyAableAction = ({ id, university_name }: { id: number, university_name: string }) => {
    const router = useRouter()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <Button onClick={() => router.push(`/admin/universities/view/${id}`)} variant={"ghost"} className="p-2 w-full flex gap-3 justify-start items-center"><Eye size={16} />
                    View
                </Button>
                <AssignLicense clientId={id} />
                <Button onClick={() => router.push(`/admin/universities/license-history?university_id=${id}&university_name=${university_name}`)} variant={"ghost"} className="p-2 w-full flex gap-3 justify-start items-center"><FileClock size={16} />
                    License History
                </Button>
                <DeleteUniversityPopup id={id} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UniveristyAableAction