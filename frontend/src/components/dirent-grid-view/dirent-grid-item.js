import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { gettext, siteRoot, mediaUrl } from '../../utils/constants';
import { Utils } from '../../utils/utils';

const propTypes = {
  path: PropTypes.string.isRequired,
  repoID: PropTypes.string.isRequired,
  dirent: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
  showImagePopup: PropTypes.func.isRequired,
  handleContextClick: PropTypes.func.isRequired,
};

class DirentGridItem extends React.Component {

  onItemClick = (e) => {
    e.preventDefault();
    
    const dirent = this.props.dirent;
    if (Utils.imageCheck(dirent.name)) {
      this.props.showImagePopup(dirent);
    } else {
      this.props.onItemClick(dirent);
    }
  }

  getFileUrl = (url) => {
    let fileUrlArr = url.split('/');
    if (fileUrlArr.indexOf('48') !== -1) {
      fileUrlArr.splice(fileUrlArr.indexOf('48'), 1, '192');
    }
    let fileUrl = fileUrlArr.join('/');
    return fileUrl;
  }

  onItemContextMenu = (event) => {
    this.handleContextClick(event);
  }

  handleContextClick = (event) => {
    this.props.handleContextClick(event, this.props.dirent);
  }
   
  render() {
    let { dirent, path } = this.props;
    let direntPath = Utils.joinPath(path, dirent.name);
    let iconUrl = Utils.getDirentIcon(dirent);
    let fileUrl = dirent.encoded_thumbnail_src ? this.getFileUrl(dirent.encoded_thumbnail_src) : '';

    let dirHref = '';
    if (this.props.currentRepoInfo) {
      dirHref = siteRoot + 'library/' + this.props.repoID + '/' + this.props.currentRepoInfo.repo_name + Utils.encodePath(direntPath);
    }
    let fileHref = siteRoot + 'lib/' + this.props.repoID + '/file' + Utils.encodePath(direntPath);
    

    return(
      <Fragment>
        <li className="grid-item" onContextMenu={this.onItemContextMenu}>
          <div 
            className="grid-file-img-link cursor-pointer"
            onClick={this.onItemClick}
          >
            {dirent.encoded_thumbnail_src ?
              <img src={`${siteRoot}${fileUrl}`} ref={this.gridIcon} className="thumbnail" onClick={this.onItemClick} alt=""/> :
              <img src={iconUrl} ref={this.gridIcon} width="96" alt='' />
            }
            {dirent.is_locked && <img className="grid-file-locked-icon" src={mediaUrl + 'img/file-locked-32.png'} alt={gettext('locked')} title={dirent.lock_owner_name}/>}
          </div>
          <div className="grid-file-name">
            <a className="grid-file-name-link" href={dirent.type === 'dir' ? dirHref : fileHref} onClick={this.onItemClick}>{dirent.name}</a>
          </div>
        </li>
      </Fragment>
    )
  }
}

DirentGridItem.propTypes = propTypes;
export default DirentGridItem;