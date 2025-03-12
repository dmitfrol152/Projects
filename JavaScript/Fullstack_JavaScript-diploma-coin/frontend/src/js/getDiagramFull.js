import { Chart } from 'chart.js/auto';

export function getDiagramFull(data, app) {
  try {

    const canvas = document.createElement('canvas');
    app.querySelector('.account__dynamics-diagram').append(canvas);
    canvas.style.height = '195px';

    const currentMonth = new Date().getMonth();

    const month1 = [];
    const month2 = [];
    const month3 = [];
    const month4 = [];
    const month5 = [];
    const month6 = [];
    const month7 = [];
    const month8 = [];
    const month9 = [];
    const month10 = [];
    const month11 = [];
    const month12 = [];

    const lastMonth = currentMonth;
    const twoMonthsAgo = (currentMonth - 1 + 12) % 12;
    const threeMonthsAgo = (currentMonth - 2 + 12) % 12;
    const fourMonthsAgo = (currentMonth - 3 + 12) % 12;
    const fiveMonthsAgo = (currentMonth - 4 + 12) % 12;
    const sixMonthsAgo = (currentMonth - 5 + 12) % 12;
    const sevenMonthsAgo = (currentMonth - 5 + 12) % 12;
    const eightMonthsAgo = (currentMonth - 5 + 12) % 12;
    const nineMonthsAgo = (currentMonth - 5 + 12) % 12;
    const tenMonthsAgo = (currentMonth - 5 + 12) % 12;
    const elevenMonthsAgo = (currentMonth - 5 + 12) % 12;
    const twelveMonthsAgo = (currentMonth - 5 + 12) % 12;

    data.payload.transactions.forEach(transaction => {
      const month = new Date(transaction.date).getMonth();

      if (month === lastMonth) {
        month1.push(transaction.amount)
      };
      if (month === twoMonthsAgo) {
        month2.push(transaction.amount)
      };
      if (month === threeMonthsAgo) {
        month3.push(transaction.amount)
      };
      if (month === fourMonthsAgo) {
        month4.push(transaction.amount)
      };
      if (month === fiveMonthsAgo) {
        month5.push(transaction.amount)
      };
      if (month === sixMonthsAgo) {
        month6.push(transaction.amount)
      };
      if (month === sevenMonthsAgo) {
        month7.push(transaction.amount)
      };
      if (month === eightMonthsAgo) {
        month8.push(transaction.amount)
      };
      if (month === nineMonthsAgo) {
        month9.push(transaction.amount)
      };
      if (month === tenMonthsAgo) {
        month10.push(transaction.amount)
      };
      if (month === elevenMonthsAgo) {
        month11.push(transaction.amount)
      };
      if (month === twelveMonthsAgo) {
        month12.push(transaction.amount)
      };
    });

    const sum1 = Number(month1
      .reduce((sum, balance) => sum + balance, 0)
      .toFixed(2));
    const sum2 = Number(month2
      .reduce((sum, balance) => sum + balance, 0)
      .toFixed(2));
    const sum3 = Number(month3
      .reduce((sum, balance) => sum + balance, 0)
      .toFixed(2));
    const sum4 = Number(month4
      .reduce((sum, balance) => sum + balance, 0)
      .toFixed(2));
    const sum5 = Number(month5
      .reduce((sum, balance) => sum + balance, 0)
      .toFixed(2));
    const sum6 = Number(month6
      .reduce((sum, balance) => sum + balance, 0)
      .toFixed(2));
    const sum7 = Number(month7
      .reduce((sum, balance) => sum + balance, 0)
      .toFixed(2));
    const sum8 = Number(month8
      .reduce((sum, balance) => sum + balance, 0)
      .toFixed(2));
    const sum9 = Number(month9
      .reduce((sum, balance) => sum + balance, 0)
      .toFixed(2));
    const sum10 = Number(month10
      .reduce((sum, balance) => sum + balance, 0)
      .toFixed(2));
    const sum11 = Number(month11
      .reduce((sum, balance) => sum + balance, 0)
      .toFixed(2));
    const sum12 = Number(month12
      .reduce((sum, balance) => sum + balance, 0)
      .toFixed(2));

    const sums = [ sum12, sum11, sum10, sum9, sum8, sum7, sum6, sum5, sum4, sum3, sum2, sum1];

    const months = [];

    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      months.push(['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'][monthIndex]);
    }

    const maxAmount = Math.max(...sums);
    const minAmount = Math.min(...sums);

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          data: sums,
          backgroundColor: '#116ACC'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          chartAreaBorder: {
            borderColor: 'black',
            borderWidth: 1,
            borderDash: [],
            borderDashOffset: 0
          }
        },
        scales: {
          x: {
            border: {
              display: true,
              color: 'black',
              width: 1
            },
            grid: {
              display: false,
              drawTicks: false,
              drawOnChartArea: false,
              drawBorder: true
            },
            ticks: {
              font: {
                family: 'WorkSans',
                size: 20,
                lineHeight: 1.2,
                weight: '700'
              },
              color: 'black'
            }
          },
          y: {
            position: 'right',
            beginAtZero: false,
            min: minAmount,
            max: maxAmount,
            border: {
              display: true,
              color: 'black',
              width: 1
            },
            grid: {
              display: false,
              drawTicks: false,
              drawOnChartArea: false,
              drawBorder: true
            },
            ticks: {
              padding: 10,
              font: {
                family: 'Roboto',
                size: 20,
                lineHeight: 1.2,
                weight: '500'
              },
              color: 'black',
              stepSize: Math.ceil(maxAmount / 1),
            }
          }
        }
      },
      plugins: [{
        id: 'chartAreaBorder',
        beforeDraw(chart, args, options) {
          const { ctx, chartArea: { left, top, width, height } } = chart;
          ctx.save();
          ctx.strokeStyle = options.borderColor;
          ctx.lineWidth = options.borderWidth;
          ctx.setLineDash(options.borderDash || []);
          ctx.lineDashOffset = options.borderDashOffset;
          ctx.strokeRect(left, top, width, height);
          ctx.restore();
        }
      }]
    });

  } catch (error) {
    console.error('Ошибка:', error);
  }
}
