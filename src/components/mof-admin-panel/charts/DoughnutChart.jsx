import { Doughnut } from "react-chartjs-2"



const DoughnutChart = ({ labels, dataValues,backgroundColor, titleText }) => {

const data = {

    labels,

    datasets: [

      {

        data: dataValues,

        backgroundColor: backgroundColor,

        borderColor: backgroundColor,

        borderWidth: 1,

      },

    ],

  }



const options = {

    responsive: true,

    maintainAspectRatio: true,

    aspectRatio: 2,

    plugins: {

      legend: {

        position: "top" ,

      },

      title: {

        display: true,
        text: titleText,
        font:{
          size:18,
          weight:'bold'
        }
      },

    },

  }



return <Doughnut data={data} options={options} />

}



export default DoughnutChart