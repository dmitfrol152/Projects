import { Chart } from 'chart.js/auto';

export function getCompareFull(data, app) {
  try {

    const canvas = document.createElement('canvas');
    app.querySelector('.account__compare-diagram').append(canvas);
    canvas.style.height = '195px';
    const account = data.payload.account;

    const currentMonth = new Date().getMonth();

    const monthCome1 = [];
    const monthCome2 = [];
    const monthCome3 = [];
    const monthCome4 = [];
    const monthCome5 = [];
    const monthCome6 = [];
    const monthCome7 = [];
    const monthCome8 = [];
    const monthCome9 = [];
    const monthCome10 = [];
    const monthCome11 = [];
    const monthCome12 = [];

    const monthLeave1 = [];
    const monthLeave2 = [];
    const monthLeave3 = [];
    const monthLeave4 = [];
    const monthLeave5 = [];
    const monthLeave6 = [];
    const monthLeave7 = [];
    const monthLeave8 = [];
    const monthLeave9 = [];
    const monthLeave10 = [];
    const monthLeave11 = [];
    const monthLeave12 = [];

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

      if (account !== transaction.from) {
        if (month === lastMonth) {
          monthCome1.push(transaction.amount)
        };
        if (month === twoMonthsAgo) {
          monthCome2.push(transaction.amount)
        };
        if (month === threeMonthsAgo) {
          monthCome3.push(transaction.amount)
        };
        if (month === fourMonthsAgo) {
          monthCome4.push(transaction.amount)
        };
        if (month === fiveMonthsAgo) {
          monthCome5.push(transaction.amount)
        };
        if (month === sixMonthsAgo) {
          monthCome6.push(transaction.amount)
        };
        if (month === sevenMonthsAgo) {
          monthCome7.push(transaction.amount)
        };
        if (month === eightMonthsAgo) {
          monthCome8.push(transaction.amount)
        };
        if (month === nineMonthsAgo) {
          monthCome9.push(transaction.amount)
        };
        if (month === tenMonthsAgo) {
          monthCome10.push(transaction.amount)
        };
        if (month === elevenMonthsAgo) {
          monthCome11.push(transaction.amount)
        };
        if (month === twelveMonthsAgo) {
          monthCome12.push(transaction.amount)
        };
      } else {
        if (month === lastMonth) {
          monthLeave1.push(transaction.amount)
        };
        if (month === twoMonthsAgo) {
          monthLeave2.push(transaction.amount)
        };
        if (month === threeMonthsAgo) {
          monthLeave3.push(transaction.amount)
        };
        if (month === fourMonthsAgo) {
          monthLeave4.push(transaction.amount)
        };
        if (month === fiveMonthsAgo) {
          monthLeave5.push(transaction.amount)
        };
        if (month === sixMonthsAgo) {
          monthLeave6.push(transaction.amount)
        };
        if (month === sevenMonthsAgo) {
          monthLeave7.push(transaction.amount)
        };
        if (month === eightMonthsAgo) {
          monthLeave8.push(transaction.amount)
        };
        if (month === nineMonthsAgo) {
          monthLeave9.push(transaction.amount)
        };
        if (month === tenMonthsAgo) {
          monthLeave10.push(transaction.amount)
        };
        if (month === elevenMonthsAgo) {
          monthLeave11.push(transaction.amount)
        };
        if (month === twelveMonthsAgo) {
          monthLeave12.push(transaction.amount)
        };
      }
    });

    const sumCome1 = Number(monthCome1
      .reduce((sum, balance) => sum + balance, 0)
      .toFixed(2));
    const sumCome2 = Number(monthCome2
      .reduce((sumCome, balance) => sumCome + balance, 0)
      .toFixed(2));
    const sumCome3 = Number(monthCome3
      .reduce((sumCome, balance) => sumCome + balance, 0)
      .toFixed(2));
    const sumCome4 = Number(monthCome4
      .reduce((sumCome, balance) => sumCome + balance, 0)
      .toFixed(2));
    const sumCome5 = Number(monthCome5
      .reduce((sumCome, balance) => sumCome + balance, 0)
      .toFixed(2));
    const sumCome6 = Number(monthCome6
      .reduce((sumCome, balance) => sumCome + balance, 0)
      .toFixed(2));
    const sumCome7 = Number(monthCome7
      .reduce((sumCome, balance) => sumCome + balance, 0)
      .toFixed(2));
    const sumCome8 = Number(monthCome8
      .reduce((sumCome, balance) => sumCome + balance, 0)
      .toFixed(2));
    const sumCome9 = Number(monthCome9
      .reduce((sumCome, balance) => sumCome + balance, 0)
      .toFixed(2));
    const sumCome10 = Number(monthCome10
      .reduce((sumCome, balance) => sumCome + balance, 0)
      .toFixed(2));
    const sumCome11 = Number(monthCome11
      .reduce((sumCome, balance) => sumCome + balance, 0)
      .toFixed(2));
    const sumCome12 = Number(monthCome12
      .reduce((sumCome, balance) => sumCome + balance, 0)
      .toFixed(2));

    const sumLeave1 = Number(monthLeave1
      .reduce((sum, balance) => sum + balance, 0)
      .toFixed(2));
    const sumLeave2 = Number(monthLeave2
      .reduce((sumLeave, balance) => sumLeave + balance, 0)
      .toFixed(2));
    const sumLeave3 = Number(monthLeave3
      .reduce((sumLeave, balance) => sumLeave + balance, 0)
      .toFixed(2));
    const sumLeave4 = Number(monthLeave4
      .reduce((sumLeave, balance) => sumLeave + balance, 0)
      .toFixed(2));
    const sumLeave5 = Number(monthLeave5
      .reduce((sumLeave, balance) => sumLeave + balance, 0)
      .toFixed(2));
    const sumLeave6 = Number(monthLeave6
      .reduce((sumLeave, balance) => sumLeave + balance, 0)
      .toFixed(2));
    const sumLeave7 = Number(monthLeave7
      .reduce((sumLeave, balance) => sumLeave + balance, 0)
      .toFixed(2));
    const sumLeave8 = Number(monthLeave8
      .reduce((sumLeave, balance) => sumLeave + balance, 0)
      .toFixed(2));
    const sumLeave9 = Number(monthLeave9
      .reduce((sumLeave, balance) => sumLeave + balance, 0)
      .toFixed(2));
    const sumLeave10 = Number(monthLeave10
      .reduce((sumLeave, balance) => sumLeave + balance, 0)
      .toFixed(2));
    const sumLeave11 = Number(monthLeave11
      .reduce((sumLeave, balance) => sumLeave + balance, 0)
      .toFixed(2));
    const sumLeave12 = Number(monthLeave12
      .reduce((sumLeave, balance) => sumLeave + balance, 0)
      .toFixed(2));

    const sumsCome = [sumCome12, sumCome11, sumCome10, sumCome9, sumCome8, sumCome7, sumCome6, sumCome5, sumCome4, sumCome3, sumCome2, sumCome1];

    const sumsLeave = [sumLeave12, sumLeave11, sumLeave10, sumLeave9, sumLeave8, sumLeave7, sumLeave6, sumLeave5, sumLeave4, sumLeave3, sumLeave2, sumLeave1];

    const months = [];

    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      months.push(['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'][monthIndex]);
    }

    const maxAmountCome = Math.max(...sumsCome);
    const minAmountCome = Math.min(...sumsCome);

    const maxAmountLeave = Math.max(...sumsLeave);
    const minAmountLeave = Math.min(...sumsLeave);

    // const middleAmount = Math.min(maxAmountCome, maxAmountLeave);

    const middleAmount = maxAmountCome > maxAmountLeave ? ((maxAmountLeave * 100 / maxAmountCome) / 100) : ((maxAmountCome * 100 / maxAmountLeave) / 100);

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            data: sumsLeave,
            backgroundColor: '#FF453A'
          },
          {
            data: sumsCome,
            backgroundColor: '#76CA66'
          }
        ]
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
          }
        },
        scales: {
          x: {
            stacked: true,
            border: {
              display: true,
              color: 'black',
              width: 1
            },
            grid: {
              display: false,
            },
            ticks: {
              font: {
                family: 'WorkSans',
                size: 20,
                weight: '700'
              },
              color: 'black'
            }
          },
          y: {
            stacked: true,
            position: 'right',
            min: minAmountCome > minAmountLeave ? minAmountCome : minAmountLeave,
            max: maxAmountCome > maxAmountLeave ? maxAmountCome : maxAmountLeave,
            border: {
              display: true,
              color: 'black',
              width: 1
            },
            grid: {
              display: false,
            },
            ticks: {
              padding: 10,
              font: {
                family: 'Roboto',
                size: 20,
                weight: '500'
              },
              color: 'black',
            },
            stepSize: maxAmountCome > maxAmountLeave ? maxAmountCome * middleAmount : maxAmountLeave * middleAmount
          }
        }
      },
      plugins: [{
        id: 'chartAreaBorder',
        beforeDraw(chart, options) {
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
