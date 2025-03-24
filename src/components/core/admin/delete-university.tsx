import React from 'react'
import Popup from '@/components/core/popup'
import { LoaderCircle, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { useAdminActions } from '@/hooks/use-admin-actions'



const DeleteUniversityPopup = ({ id }: { id: number }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false);
    const { deleteUniversityAction } = useAdminActions()
    const handleDelete = async (id: number) => {
        try {
            setIsLoading(true);
            await deleteUniversityAction(id)
        } catch  {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request."
            });
        } finally {
            setIsOpen(false);
        }
    };

    return (
        <Popup
            open={isOpen}
            onOpenChange={setIsOpen}
            trigger={<Button variant={"ghost"} className="p-2 w-full flex gap-3 justify-start items-center" onClick={() => setIsOpen(true)}> <Trash size={16} />Delete University</Button>}
            title="Delete university"
            footer={<>
                <Button onClick={() => setIsOpen(false)} variant={"secondary"}>No</Button>
                <Button type="submit" onClick={() => { handleDelete(id) }} disabled={isLoading}>
                    {isLoading && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                    Yes
                </Button>
            </>
            }

        >
            Are you sure want to delete this university ?
        </Popup>
    )
}

export default DeleteUniversityPopup