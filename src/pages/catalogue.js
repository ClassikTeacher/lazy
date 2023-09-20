import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { CatalogBlockItems, CatalogFilterPopup, CatalogSPagination, CatalogSelectormenu, CatalogSidemenu, CatalogSidemenuItem } from '../modules/Catalogue'
import { useSort } from '../modules/Catalogue/utils/sorted'
import useIsomorphicLayoutEffect from '../hooks/use-isomorphic-layout-effect'
import { graphql, useStaticQuery } from 'gatsby'
import { navigate } from '@reach/router';
import { SEO } from '../components/SEO/SEO'

const CataloguePage = (props)=>{
    const dataArtist = props.data.allStrapiArtist.nodes
    const dataMedium = props.data.allStrapiProductType.nodes
    const dataProducts = props.data.allStrapiProduct.nodes
    
    const [isOpenedFilterPopup, setIsOpenedFilterPopup] = useState(false)
    
    const [limit, setLimit] = useState(9)
    const [page, setPage] = useState(initPage())
    const [pages, setPages] = useState(1)

    const params = new URLSearchParams(props.location.search);
    let sortQ = params.get('sort');
    let artistsQ = params.get('artists');
    let mediumsQ = params.get('mediums');
    const [sorted, setSorted] = useState(sortQ)
    const [sort, setSort] = useState([
        {value: 'new', text: 'Recent', status: sortQ==='new'}, 
        {value: 'big', text: 'Size (descending)', status: sortQ==='big'}, 
        {value: 'small', text: 'Size (ascending)', status: sortQ==='small'}
    ])

    const [arrFilterArtist, setArrFilterArtist] = useState(artistsQ?JSON.parse(artistsQ):[])
    const [arrFilterMedium, setArrFilterMedium] = useState(mediumsQ?JSON.parse(mediumsQ):[])
    
    const [filterArtist, setFilterArtist] = useState([])
    const [filterMedium, setFilterMedium] = useState([])
    
    if(sortQ || artistsQ || mediumsQ) setLocalStorage();
    const [dataItems, setDataItems] = useState(initArrProduct())

    function changeURL(){
        let sortMap = {
            'sort': {
                'statement': sorted,
                'val': sorted
            },
            'artists': {
                'statement': arrFilterArtist.length,
                'val': JSON.stringify(arrFilterArtist)
            },
            'mediums': {
                'statement': arrFilterMedium.length,
                'val': JSON.stringify(arrFilterMedium)
            }
        }
        let url = ``;
        let filters = [];
        Object.keys(sortMap).forEach(key=>{
            let tmp = sortMap[key];
            console.log(tmp)
            tmp['statement'] && filters.push(`${key}=${tmp['val']}`);
        })
        filters.length && (url = `?${filters.join('&')}`);
        url && window.history.pushState({}, '', url);
    }
    

    function changeLimit(){
        if (typeof window !== 'undefined'){
            if(window.innerWidth >= 960){
                setLimit(9)
                setIsOpenedFilterPopup(false)
            }
            if(window.innerWidth <= 960 && window.innerWidth > 480){
                setLimit(4)
            }   
            if(window.innerWidth <= 480){
                setLimit(6)
            }
        }
    }

    useIsomorphicLayoutEffect(() => {
        if (typeof window !== 'undefined'){
        window.addEventListener('resize', changeLimit);

        return () => window.removeEventListener('resize', changeLimit);
        }
    }, []);    

    const sortedData = useSort(sorted, dataItems)
    const filterArtistData = useMemo(() => {
        if(arrFilterArtist.length){
            return [...sortedData].filter((item) => arrFilterArtist.includes(item.artist))
        } else {
            return [...sortedData]
        } 
    }, [arrFilterArtist, sorted, arrFilterMedium])

    const filteredAndSortedData = useMemo(() => {
        if(arrFilterMedium.length){
            return [...filterArtistData].filter((item) => arrFilterMedium.includes(item.type))
        } else {
            return [...filterArtistData]
        } 
    }, [arrFilterArtist, sorted, arrFilterMedium])

    const currentPage = useMemo(() => {

    return [...filteredAndSortedData].slice((page-1)*limit, page*limit)
    }, [arrFilterArtist, sorted, arrFilterMedium, filteredAndSortedData, page, limit])

    function initPagination(){
        let countPages = Math.floor(filteredAndSortedData.length / (limit))
        if(filteredAndSortedData.length % (limit) || filteredAndSortedData.length === 0){
            countPages +=1
        }
        setPages(countPages)
        const pageStorage = sessionStorage.getItem('pageCatalogue')

        if(pageStorage && countPages >= pageStorage){
            setPage(Number(pageStorage))
        } else {
            setPage(1)
        }

    }

    function setLocalStorage(){
        if (typeof window !== 'undefined'){
        sessionStorage.setItem('sort', sorted)
        sessionStorage.setItem('filterArtist', arrFilterArtist)
        sessionStorage.setItem('filterMedium', arrFilterMedium)
        sessionStorage.setItem('pageCatalogue', page)
        }
    }

    function initArrProduct(){
        const newDataProducts = []
        const artistList = []
        const artistObj = {}
        const sortedProduct = []
        dataProducts.sort((b, a) => {
            const dateA =  new Date(a.date);
            const dateB = new Date(b.date)
        return dateA-dateB
        })
        dataProducts?.map(item=> {
            newDataProducts.push({"id": item.id,  slug: item.slug, "image": item.image[0].localFile, "artist": item.artist?.name, height: item.size.height, width: item.size.width, length: item.size.length, "name": item.name, "type": item.type?.technical_name, "date": item.date})
            if(!artistList.includes(item.artist?.name)){
                artistList.push(item.artist?.name)
            }
            if(artistObj[item.artist?.name]){
                artistObj[item.artist?.name].push({"id": item.id,  slug: item.slug, "image": item.image[0].localFile, "artist": item.artist?.name, height: item.size.height, width: item.size.width, length: item.size.length, "name": item.name, "type": item.type?.technical_name, "date": item.date})
            } else {
                artistObj[item.artist?.name] = [{"id": item.id,  slug: item.slug, "image": item.image[0].localFile, "artist": item.artist?.name, height: item.size.height, width: item.size.width, length: item.size.length, "name": item.name, "type": item.type?.technical_name, "date": item.date}]
            }
        })
        newDataProducts.sort((b, a) => {
            const dateA =  new Date(a.date);
            const dateB = new Date(b.date)
        return dateA-dateB
        })
        let max = 0
        artistList.map(item => {
            if(artistObj[item].length > max){
                max = artistObj[item].length
            }
        })
        for (let i = 0; i < max; i++){
            artistList.map(item => {
                if(artistObj[item]?.[i]){
                    sortedProduct.push(artistObj[item]?.[i])
                }
            })
        }
        console.log(artistList)
        console.log(artistObj)
        console.log(newDataProducts)
        console.log(sortedProduct)
      
       return sortedProduct
    }

    function getLocalStorage(){
        if (typeof window !== 'undefined'){
        const sortStorage = sessionStorage.getItem('sort')
        const filterArtistStorage = sessionStorage.getItem('filterArtist')
        const filterMediumStorage = sessionStorage.getItem('filterMedium')
        const pageStorage = sessionStorage.getItem('pageCatalogue')
        const newDataProducts = initArrProduct()
       setDataItems(newDataProducts)
        if(pageStorage){
            setPage(Number(pageStorage))
        }
        setSorted(sortStorage)
        const dataFilterArtist = []
        const bufName = []
        dataProducts.map(item => {
            if(!bufName?.includes(item.artist?.name)){
                bufName.push(item.artist?.name)
                dataFilterArtist.push( {value: item.artist?.name, text: item.artist?.name, status: false})
            }
        })        
        // const newFilterArt = [] 
        // dataArtist?.map(item => {
        //     newFilterArt.push( {value: item.name, text: item.name, status: false})
        // })

        if(filterArtistStorage !== '' && filterArtistStorage !== undefined && filterArtistStorage !== null){
            setArrFilterArtist(filterArtistStorage.split(','))
            dataFilterArtist?.map(item => {
                if(filterArtistStorage.split(',').includes(item.value)){
                    item.status = true
                }
            })
            dataFilterArtist.sort((a, b) => {   
                if(a.text < b.text) { return -1; }
                if(a.text > b.text) { return 1; }
              return 0
            })
            setFilterArtist(dataFilterArtist)
        } else {
            dataFilterArtist.sort((a, b) => {   
                if(a.text < b.text) { return -1; }
                if(a.text > b.text) { return 1; }
              return 0
            })
            setFilterArtist(dataFilterArtist)
             setArrFilterMedium([])
        }
        const newFilterMedium = []
        dataProducts.map(item => {if(!item.type?.technical_name){console.log(item)}})
        const filterDataMedium = dataMedium.filter(item => dataProducts.some(product => product.type?.technical_name === item.technical_name))
        console.log(filterDataMedium)
        filterDataMedium?.map(item => {
            newFilterMedium.push({value: item?.technical_name, text: item.name, status: false})
        })
        if(filterMediumStorage !== '' && filterMediumStorage !== undefined && filterMediumStorage !== null){
            setArrFilterMedium(filterMediumStorage.split(','))
            newFilterMedium?.map(item => {
                if(filterMediumStorage.split(',').includes(item.value)){
                    item.status = true
                }
            })
            newFilterMedium.sort((a, b) => {   
                if(a.text < b.text) { return -1; }
                if(a.text > b.text) { return 1; }
              return 0
            })
            setFilterMedium(newFilterMedium)
        } else {
            newFilterMedium.sort((a, b) => {   
                if(a.text < b.text) { return -1; }
                if(a.text > b.text) { return 1; }
              return 0
            })
            setFilterMedium(newFilterMedium)
            setArrFilterMedium([])
        }
    }
    }

    function initPage(){
        if (typeof window !== 'undefined'){
        const pageStorage = sessionStorage.getItem('pageCatalogue')
        if(pageStorage){
            return +pageStorage
        } else {
            return 1
        }
    }
    }

    function initFilterMedium(){
        if(arrFilterMedium.length !== 0){
            filterMedium?.map(item => {
                if(arrFilterMedium.includes(item.value)){
                    item.status = true
                }
            })
        }
    }

    function initFilterArtist(){
        if(arrFilterArtist.length !== 0){
            filterArtist?.map(item => {
                if(arrFilterArtist.includes(item.value)){
                    item.status = true
                }
            })
        }
    }   

    useEffect(() => {
        getLocalStorage()
        initFilterMedium()
        initFilterArtist()
        // initPage()
        changeLimit()
        initPagination()
    }, [])

    useEffect(()=> {
        setLocalStorage()
        changeURL();
    }, [sorted, arrFilterArtist, arrFilterMedium, page])

    useEffect(() => {
        const newArr = []
        filterArtist?.map(item => {
            if(item.status){
                newArr.push(item.value)
            }
        })
        setArrFilterArtist(newArr)
    }, [filterArtist])

    useEffect(() => {
        const newArr = []
        filterMedium?.map(item => {
            if(item.status){
                newArr.push(item.value)
            }
        })
        setArrFilterMedium(newArr)
    }, [filterMedium])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page])

    useEffect(() => {
        initPagination()
    }, [limit, arrFilterArtist, sorted, arrFilterMedium])

    return(
        <div className='page'>
            <Layout location={props.location}>
                <div className="pageWrapper catalogue">
                    <CatalogSelectormenu
                        sort={sort}
                        setSort={setSort}
                        sorted={sorted}
                        setSorted={setSorted}
                        isOpen={isOpenedFilterPopup}
                        setIsOpen={setIsOpenedFilterPopup}
                    />
                    <div className="pageWrapper-catalogue-contentContainer" >
                        <CatalogSidemenu
                            sorted={sorted}
                            setSorted={setSorted}
                            filterArtist={filterArtist}
                            setFilterArtist={setFilterArtist}
                            filterMedium={filterMedium}
                            setFilterMedium={setFilterMedium}
                            sort={sort}
                            setSort={setSort}
                        />
                        <CatalogBlockItems
                            listItems={currentPage}
                        />
                     </div>
                     <CatalogSPagination
                        page={page}
                        pages={pages}
                        setPage={setPage}
                     />
                     <CatalogFilterPopup
                        isOpen={isOpenedFilterPopup}
                        setIsOpen={setIsOpenedFilterPopup}
                     >
                        <>
                        <CatalogSidemenuItem 
                            title={"Artists"}
                            options={filterArtist}
                            setOptions={setFilterArtist}
                            type={'filter'}
                        />
                         <CatalogSidemenuItem 
                            title={"Medium"}
                            options={filterMedium}
                            setOptions={setFilterMedium}
                            type={'filter'}
                        />
                        </>
                     </CatalogFilterPopup>
                </div>
            </Layout>

        </div>
    )
}
export default CataloguePage

export const Head = () => (
    <SEO title={'Lazy Mike: Catalog'} 
        title_og={'Lazy Mike: Catalog'} 
        description_og={`Explore the catalog of artworks by artists represented by Lazy Mike gallery.`}
        description={`Explore the catalog of artworks by artists represented by Lazy Mike gallery.`} 
        image={`/Snippet_logo.jpg`}
        image_og={`/Snippet_catalogue.jpg`}
        pathname={'/catalogue'}
    />
  )

export const query = graphql`
query MyQuery {
    allStrapiProductType {
      nodes {
        name
        technical_name
        id
        strapi_id
      }
    }
    allStrapiProduct {
        nodes {
          date
          image {
            url
            localFile {
                childImageSharp {
                  gatsbyImageData
                }
            }
          }
          name
          size {
            height
            width
            length
          }
          type {
            technical_name
            name
          }
          artist {
            name
            id
          }
          id
          slug
        }
      }
      allStrapiArtist {
        nodes {
          name
        }
      }
  }
`