import React from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import { deleteContent, } from '../../actions/contentActions';


export class TagTable extends React.Component {

  render() {
    return (
      <div>
        <h2>Tags</h2>
        <table className='tag-table table table-hover table-condensed'>
          <thead>
            <tr>
              <th className='tag-table__heading--id'>Id</th>
              <th className='tag-table__heading--referenced-by'>Referenced By</th>
              <th className='tag-table__heading--actions'></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.tags.map(tag => {
                const disabled = tag.referencedBy.length > 0 || this.props.loading;
                return <tr key={tag.id}>
                  <td className='tag-table__data--id'>{tag.id}</td>
                  <td className='tag-table__data--references-by'>{tag.referencedBy.join(', ')}</td>
                  <td className='tag-table__data--action'>
                    {
                      <button className='btn btn-xs btn-danger' disabled={disabled} onClick={() => this.props.deleteContent(tag.id)} ><i className='fa fa-trash' /></button>
                    }
                  </td>
                </tr>;
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

TagTable.propTypes = {
  tags: PropTypes.array,
  loading: PropTypes.bool,
};

function mapStateToProps(state, props) {
  return {
    loading: state.content.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteContent: tag => {
      dispatch(deleteContent(tag));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TagTable);
