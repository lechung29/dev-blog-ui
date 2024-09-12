import { IPostCategoryValue } from "../dashboard/createpost/util"

interface ITabListProps {
    label: string
    value: IPostCategoryValue
}

export const SearchTabList: ITabListProps[] = [
    {
        label: "Bài viết",
        value: "post",
    },
    {
        label: "Câu hỏi",
        value: "question",
    },
    {
        label: "Thảo luận",
        value: "discussion",
    }
]