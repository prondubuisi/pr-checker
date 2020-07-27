import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const FaqEntry = ({ data }) => {
  return (
    <div className="faqs shadow-lg flex text-mid-grey mb-6 p-4 break-words">
      <div className="pb-2 flex flex-wrap justify-left content-center rounded mx-auto my-5 overflow-hidden w-5/6 lg:w-100 ">
        <h3 className="text-light-blue mb-4"> {data.question}</h3>
        <p className="text-mid-grey overflow-auto">
          {ReactHtmlParser(data.answer)}
        </p>
      </div>
    </div>
  );
};

export default FaqEntry;
