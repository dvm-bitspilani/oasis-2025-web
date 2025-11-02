import type { CSSProperties } from "react";

interface ImageProperty {
    src: string;
    modifiers?: CSSProperties
}

const galleryImageProperties: ImageProperty[] = [
    {
        src: './images/gallery/gallery_IMG_3953.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery_3K2A0022.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery__H4A0455.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery_IMG_4225.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery__H4A3519.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery_DSC00199.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery__H4A3369.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery__H4A0022.jpeg',
        modifiers: {
            objectPosition: "center 69%",
        }
    },
    {
        src: './images/gallery/gallery_3K2A0863.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery__H4A0035.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery__H4A3316.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery__H4A3296.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery_0H4A2800.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery_3K2A1046.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery__MG_0552.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery_DSC00072.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery_0H4A2749.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery__MG_8684.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery_3K2A9949.jpeg',
        modifiers: {
            objectPosition: 'center 10%'
        }
    },
    {
        src: './images/gallery/gallery_3K2A0013.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery__H4A9619.jpeg',
        modifiers: {
            objectPosition: 'center 10%'
        }
    },
    {
        src: './images/gallery/gallery__MG_7912.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery__MG_0266.jpeg',
        modifiers: {}
    },
    {
        src: './images/gallery/gallery__MG_0028.jpeg',
        modifiers: {
            objectPosition: 'center 20%'
        }
    },
    {
        src: './images/gallery/gallery_0H4A2729.jpeg',
        modifiers: {
            objectPosition: 'center 10%'
        }
    },
]

export default galleryImageProperties;
export type { ImageProperty };