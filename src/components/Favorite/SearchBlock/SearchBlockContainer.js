import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import SearchBlock from "../../MyFragments/SearchBlock/SearchBlock";
import {getFavorites, setSearchTitle, setSearchType} from "../../../redux/favoritesReducer";


class SearchBlockContainer extends React.Component {
    searchFragments = () => {
        this.props.getFavorites(
            this.props.token,
            1,
            this.props.searchTitle,
            this.props.searchType
        );
    }

    render() {
        return (
            <SearchBlock {...this.props} searchFragments={this.searchFragments}/>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    searchTitle: state.favorites.searchTitle,
    searchType: state.favorites.searchType,
    totalFragmentsCount: state.favorites.totalFragmentsCount
});

export default compose(
    connect(mapStateToProps, {
        setSearchTitle,
        setSearchType,
        getFavorites
    }),
)(SearchBlockContainer)