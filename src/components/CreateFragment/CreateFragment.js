import React from "react";
import s from './CreateFragment.module.css';
import SelectType from "./SelectType/SelectType";
import FragmentTitle from "./FragmentTitle/FragmentTitle";
import {fragmentTypes} from "../../common/fragmentTypes";
import CreateVideo from "../CreateVideo/CreateVideo";
import CreateArticle from "../CreateArticle/CreateArticle";
import TagsListContainer from "./TagsList/TagsListContainer";
import ThisTags from "./ThisTags/ThisTags";
import UploadFon from "../CreateLesson/UloadFon/UploadFon";
import CreateImage from "./CreateImage/CreateImage";


const CreateFragment = ({fragmentType, errors, ...props}) => {
    const contentErrors = errors?.content?.map(error => <p className='inputError'>{error}</p>);
    return (
        <div className={s.content}>
            <h1 className={'pageTitle'}>Создать фрагмент</h1>
            <SelectType/>
            {fragmentType &&
                <>
                    <FragmentTitle/>
                    {fragmentType !== fragmentTypes.image &&
                        <UploadFon type={'fragment'} fon={props.fon} setFon={props.setFon}/>
                    }
                    <div style={{marginBottom: '20px'}}>
                        {fragmentType === fragmentTypes.article && <CreateArticle/>}
                        {fragmentType === fragmentTypes.video && <CreateVideo/>}
                        {fragmentType === fragmentTypes.image && <CreateImage/>}
                    </div>
                    {contentErrors}
                    {!!props.tags.length &&
                        <ThisTags
                            tags={props.tags}
                            edit={true}
                            returnTag={props.returnTag}
                            deleteTag={props.deleteTag}
                        />
                    }
                    <div className={s.buttonsBlock}>
                        <TagsListContainer currentTags={props.tags} externalAddTag={props.addTag}>
                            <button className={'btn'}>Добавить теги</button>
                        </TagsListContainer>
                        <button className={'btn'} onClick={props.createFragment} disabled={props.isFetching}>Создать
                        </button>
                    </div>
                    {/*{showTagsList && <TagsListContainer currentTags={props.tags} externalAddTag={props.addTag}/>}*/}
                </>
            }

        </div>
    );
}

export default CreateFragment;