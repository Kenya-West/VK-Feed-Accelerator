import { ElementCollectionModel } from "./element-find";


export enum ElementCollection {
    Root,
    FeedFilters,
    PageBlock,
    FeedItems,

    PageBlockCustom,
    PageBlockCustomUiToggler,
}

export const elementCollectionList: ElementCollectionModel[] =
[
    {
        id: ElementCollection.Root,
        selector: "body",
        preferredMode: "selectSingle"
    },
    {
        id: ElementCollection.FeedFilters,
        selector: "#feed_filters",
        preferredMode: "selectSingle"
    },
    {
        id: ElementCollection.PageBlock,
        selector: "#feed_filters > .page_block",
        preferredMode: "selectSingle"
    },
    {
        id: ElementCollection.FeedItems,
        selector: "#feed_rows > .feed_row",
        preferredMode: "selectMultiple"
    },

    {
        id: ElementCollection.PageBlockCustom,
        selector: "#feed_filters > .page_block.vk-feed-accelerator-page_block",
        preferredMode: "selectSingle"
    },
    {
        id: ElementCollection.PageBlockCustomUiToggler,
        selector: "#feed_filters > .page_block.vk-feed-accelerator-page_block .ui_toggler",
        preferredMode: "selectSingle"
    },
]