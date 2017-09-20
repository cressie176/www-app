import React from 'react';
import PropTypes from 'prop-types';

import './TagTable.css';

class TagTable extends React.Component {

  render() {
    return (
      <div>
        <h2>Available Tags</h2>
        <table className='tag-table table table-hover table-condensed'>
          <thead>
            <tr>
              <th className='tag-table__heading__id'>Id</th>
              <th className='tag-table__heading__referenced-by'>Referenced By</th>
              <th className='tag-table__heading__actions'></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.tags.map(tag => {
                const disabled = tag.referencedBy.length > 0 || this.props.loading;
                return <tr key={tag.id}>
                  <td className='tag-table__data__id'>{tag.id}</td>
                  <td className='tag-table__data__references-by'>{tag.referencedBy.join(', ')}</td>
                  <td className='tag-table__data__action'>
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

export default TagTable;
