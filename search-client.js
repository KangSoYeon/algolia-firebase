import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    InstantSearch,
    Hits,
    SearchBox,
    Pagination,
    Highlight,
    ClearRefinements,
    RefinementList,
    Configure,
} from 'react-instantsearch-dom';
const searchClient = algoliasearch(
    '6KW9HRKJSA',
    '8e58c018be7d153b8f2639c1c3e56246'
);
const searchTab = () => {
    return (
        <div>
            <InstantSearch indexName="products" searchClient={searchClient} >
                <SearchBox />
                <Hits hitComponent={Hit} />
            </InstantSearch>
        </div>
    )
}
function Hit(props) {
    return (
        <div>
            {props.hit.objectID}
            {props.hit.name}
            {/* {props.hit} */}
        </div>
    );
}
Hit.propTypes = {
    hit: PropTypes.object.isRequired,
};
export default searchTab
