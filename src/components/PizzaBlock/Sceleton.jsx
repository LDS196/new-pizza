import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader className={'pizza-block'}
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="5" y="262" rx="10" ry="10" width="250" height="19" />
        <rect x="96" y="198" rx="0" ry="0" width="1" height="0" />
        <rect x="78" y="328" rx="0" ry="0" width="1" height="0" />
        <circle cx="130" cy="129" r="125" />
        <rect x="5" y="291" rx="10" ry="10" width="250" height="57" />
        <rect x="134" y="356" rx="10" ry="10" width="117" height="26" />
        <rect x="36" y="303" rx="0" ry="0" width="0" height="1" />
        <rect x="5" y="356" rx="10" ry="10" width="89" height="26" />
    </ContentLoader>
)

export default Skeleton

