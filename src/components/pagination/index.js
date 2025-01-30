import { ButtonGroup } from "@chakra-ui/react"
import { PaginationNextTrigger } from "components/ui/pagination"
import { PaginationItems } from "components/ui/pagination"
import { PaginationPrevTrigger } from "components/ui/pagination"
import { PaginationRoot } from "components/ui/pagination"


const Pagination = () => {
    return (
        <PaginationRoot count={10} pageSize={2} defaultPage={1} variant="solid">
            <ButtonGroup>
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
            </ButtonGroup>
        </PaginationRoot>
    )
}

export default Pagination
