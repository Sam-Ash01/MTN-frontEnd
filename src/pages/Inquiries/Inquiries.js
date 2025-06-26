import React from 'react'
import InquiryDetails from '../../components/inquiryDetails/InquiryDetails'
import InquiryForm from '../../components/inquiryForm/InquiryForm'

const Inquiries = () => {
  return (
    <div className="space-y-6">
    <InquiryDetails/>
    <InquiryForm/>
    </div>
  )
}

export default Inquiries
