interface ITabListProps {
    label: string
    value: string
}

export const SearchTabList: ITabListProps[] = [
    {
        label: "Bài viết",
        value: "newest",
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