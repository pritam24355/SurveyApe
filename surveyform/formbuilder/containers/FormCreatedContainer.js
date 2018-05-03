import { connect } from "react-redux";




function mapStateToProps(state) {
  return {
    schema: state.form.schema,
    uiSchema: state.form.uiSchema,
    formData: state.form.formData,
    publicationStatus: state.publicationStatus
  };
}

export default connect(
  mapStateToProps,
);
