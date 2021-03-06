import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactImageFallback from 'react-image-fallback';
import FormInlineMessage from './FormInlineMessage';

const initialData = {
  name: '',
  description: '',
  price: 0,
  featured: false,
  instock: 0,
  producer: 0,
  size: 0,
  thumbnail: '',
};

class ProductForm extends Component {
  state = {
    data: initialData,
    errors: {},
    loading: false,
  };

  componentDidMount() {
    if (this.props.product._id) {
      this.setState({ data: this.props.product });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.product._id &&
      nextProps.product._id !== this.state.data._id
    ) {
      this.setState({ data: nextProps.product });
    }
    if (!nextProps.product._id) {
      this.setState({ data: initialData });
    }
  }

  validate(data) {
    const errors = {};

    if (!data.name) errors.name = "This field can't be empty";
    if (!data.producer) errors.producer = "This field can't be empty";
    if (!data.size) errors.size = "This field can't be empty";
    if (!data.thumbnail) errors.thumbnail = "This field can't be empty";
    if (data.price <= 0) errors.price = "Too cheap, don't you think?";
    if (data.instock <= 0) errors.instock = 'Add the number of your product';

    return errors;
  }

  //define handleSubmit  as a class property
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch((err) =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  //Universal event handler
  //To make it universal, we need to identify from which component data came from. So, we can use name method before it.
  handleStringChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  handleNumberChange = (e) =>
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: parseInt(e.target.value, 10) || '',
      },
    });
  handleCheckboxChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.checked },
    });

  handleDropdownChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  render() {
    const { data, errors, loading } = this.state;
    const formClassNames = loading ? 'ui form loading' : 'ui form';

    return (
      <form className={formClassNames} onSubmit={this.handleSubmit}>
        <div className="ui grid">
          <div className="twelve wide column">
            <div className={errors.name ? 'field error' : 'field'}>
              <label htmlFor="name">Product Title</label>
              <input
                type="text"
                id="name"
                //add name to make universal handler
                name="name"
                placeholder="Full product title"
                value={data.name}
                onChange={this.handleStringChange}
              />
              <FormInlineMessage content={errors.name} type="error" />
            </div>
            <div className={errors.description ? 'field error' : 'field'}>
              <label htmlFor="description">Product Description</label>
              <textarea
                type="text"
                id="description "
                //add name to make universal handler
                name="description"
                placeholder="Product Description"
                value={data.description}
                onChange={this.handleStringChange}
              />
              <FormInlineMessage content={errors.description} type="error " />
            </div>
          </div>
          <div className="four wide column">
            <ReactImageFallback
              src={data.thumbnail}
              fallbackImage="http://via.placeholder.com/250x250"
              alt="Thumbnail"
              className="ui image"
            />
          </div>
        </div>

        <div className={errors.thumbnail ? 'field error' : 'field'}>
          <label htmlFor="thumbnail">Thumbnail</label>
          <input
            type="text"
            id="thumbnail"
            //add name to make universal handler
            name="thumbnail"
            placeholder="Image URL"
            value={data.thumbnail}
            onChange={this.handleStringChange}
          />
          <FormInlineMessage content={errors.thumbnail} type="error " />
        </div>

        <div className="two fields">
          <div className={errors.price ? 'field error' : 'field'}>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              //add name to make universal handler
              name="price"
              value={data.price}
              onChange={this.handleNumberChange}
            />
            <FormInlineMessage content={errors.price} type="error " />
          </div>

          <div className={errors.instock ? 'field error' : 'field'}>
            <label htmlFor="instock">In stock (pieces)</label>
            <input
              type="number"
              id="instock"
              //add name to make universal handler
              name="instock"
              value={data.instock}
              onChange={this.handleNumberChange}
            />
            <FormInlineMessage content={errors.instock} type="error " />
          </div>
        </div>

        <div className="inline field">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            checked={data.featured}
            onChange={this.handleCheckboxChange}
          />
          <label htmlFor="featured">Featured?</label>
        </div>

        <div className={errors.producers ? 'field error' : 'field'}>
          <label>Producer</label>
          <select
            name="producer"
            value={data.producer}
            onChange={this.handleDropdownChange}
          >
            <option value="0">Choose producer</option>
            {this.props.producers.map((producer) => (
              <option value={producer.name} key={producer._id}>
                {producer.name}
              </option>
            ))}
          </select>
          <FormInlineMessage content={errors.producers} type="error " />
        </div>

        <div className={errors.sizes ? 'field error' : 'field'}>
          <label>Size</label>
          <select
            name="size"
            value={data.size}
            onChange={this.handleDropdownChange}
          >
            <option value="0">Choose size</option>
            {this.props.sizes.map((size) => (
              <option value={size.name} key={size._id}>
                {size.name}
              </option>
            ))}
          </select>
          <FormInlineMessage content={errors.sizes} type="error " />
        </div>

        <div className="ui fluid buttons">
          <button className="ui primary button" type="submit">
            Create
          </button>
          <div className="or"> </div>
          <Link to="/store" className="ui button">
            Cancel
          </Link>
        </div>
      </form>
    );
  }
}

ProductForm.propTypes = {
  producers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  submit: PropTypes.func.isRequired,
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    featured: PropTypes.bool,
    instock: PropTypes.number,
  }).isRequired,
};

ProductForm.defaultProps = {
  producers: [],
};

export default ProductForm;
