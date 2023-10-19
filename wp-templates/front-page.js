// import { useQuery, gql } from '@apollo/client';
// import * as MENUS from '../constants/menus';
// import { BlogInfoFragment } from '../fragments/GeneralSettings';
// import {
//     Header,
//     Footer,
//     Main,
//     Container,
//     NavigationMenu,
//     Hero,
//     SEO,
// } from '../components';

import { gql } from '@apollo/client';
import { flatListToHierarchical } from '@faustwp/core';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import blocks from '../wp-blocks';

// export default function Component() {
//     const { data } = useQuery(Component.query, {
//         variables: Component.variables(),
//     });

//     const { title: siteTitle, description: siteDescription } =
//         data?.generalSettings;
//     const primaryMenu = data?.headerMenuItems?.nodes ?? [];
//     const footerMenu = data?.footerMenuItems?.nodes ?? [];

//     return (
//         <>
//             <SEO title={siteTitle} description={siteDescription} />
//             <Header
//                 title={siteTitle}
//                 description={siteDescription}
//                 menuItems={primaryMenu}
//             />
//             <Main>
//                 <Container>
//                     <Hero title={'Front Page'} />
//                     <div className='text-center'>
//                         <p>
//                             This page is utilizing the "front-page" WordPress
//                             template.
//                         </p>
//                         <code>wp-templates/front-page.js</code>
//                     </div>
//                 </Container>
//             </Main>
//             <Footer title={siteTitle} menuItems={footerMenu} />
//         </>
//     );
// }

export default function Component({ loading, data }) {
    // Loading state for previews.
    if (loading) {
        return <>Loading...</>;
    }

    const { title, editorBlocks } = data?.page ?? { title: '' };
    const blockList = flatListToHierarchical(editorBlocks, {
        childrenKey: 'innerBlocks',
    });

    return (
        <div className='is-layout-constrained'>
            <h1>{title}</h1>
            <WordPressBlocksViewer blocks={blockList} />
        </div>
    );
}

// Component.query = gql`
//     ${BlogInfoFragment}
//     ${NavigationMenu.fragments.entry}
//     query GetPageData(
//         $headerLocation: MenuLocationEnum
//         $footerLocation: MenuLocationEnum
//     ) {
//         generalSettings {
//             ...BlogInfoFragment
//         }
//         headerMenuItems: menuItems(where: { location: $headerLocation }) {
//             nodes {
//                 ...NavigationMenuItemFragment
//             }
//         }
//         footerMenuItems: menuItems(where: { location: $footerLocation }) {
//             nodes {
//                 ...NavigationMenuItemFragment
//             }
//         }
//     }
// `;

// Component.variables = () => {
//     return {
//         headerLocation: MENUS.PRIMARY_LOCATION,
//         footerLocation: MENUS.FOOTER_LOCATION,
//     };
// };

Component.query = gql`
  ${blocks.CoreParagraph.fragments.entry}
  ${blocks.CoreColumns.fragments.entry}
  ${blocks.CoreColumn.fragments.entry}
  ${blocks.CoreCode.fragments.entry}
  ${blocks.CoreButtons.fragments.entry}
  ${blocks.CoreButton.fragments.entry}
  ${blocks.CoreQuote.fragments.entry}
  ${blocks.CoreImage.fragments.entry}
  ${blocks.CoreSeparator.fragments.entry}
  ${blocks.CoreList.fragments.entry}
  ${blocks.CoreHeading.fragments.entry}
  query GetPage(
    $databaseId: ID!
    $asPreview: Boolean = false
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      editorBlocks {
        name
        __typename
        renderedHtml
        id: clientId
        parentId: parentClientId
        ...${blocks.CoreParagraph.fragments.key}
        ...${blocks.CoreColumns.fragments.key}
        ...${blocks.CoreColumn.fragments.key}
        ...${blocks.CoreCode.fragments.key}
        ...${blocks.CoreButtons.fragments.key}
        ...${blocks.CoreButton.fragments.key}
        ...${blocks.CoreQuote.fragments.key}
        ...${blocks.CoreImage.fragments.key}
        ...${blocks.CoreSeparator.fragments.key}
        ...${blocks.CoreList.fragments.key}
        ...${blocks.CoreHeading.fragments.key}
      }
    }
  }
`;
