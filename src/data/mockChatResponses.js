// Predefined mock responses for the chat assistant in different languages
export const mockChatResponses = {
  en: {
      greeting: {
          type: 'text',
          content: 'Hello! How can I assist you today?'
      },
      sales: {
          type: 'chart',
          chartType: 'line',
          content: 'Here are the monthly sales for 2023 (in USD).',
          data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              values: [1200, 1500, 1100, 1800, 1700, 1600],
              seriesName: 'Sales'
          }
      },
      products: {
          type: 'table',
          content: 'Top 3 Products by Sales',
          data: {
              columns: ['Product', 'Units Sold'],
              rows: [
                  ['Product A', 250],
                  ['Product B', 200],
                  ['Product C', 150]
              ]
          }
      },
      fallback: {
          type: 'text',
          content: "I'm sorry, I didn't understand that. Could you rephrase?"
      }
  },
  es: {
      greeting: {
          type: 'text',
          content: '¡Hola! ¿En qué puedo ayudarte hoy?'
      },
      sales: {
          type: 'chart',
          chartType: 'line',
          content: 'Aquí están las ventas mensuales de 2023 (en USD).',
          data: {
              labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
              values: [1200, 1500, 1100, 1800, 1700, 1600],
              seriesName: 'Ventas'
          }
      },
      products: {
          type: 'table',
          content: 'Top 3 Productos por Ventas',
          data: {
              columns: ['Producto', 'Unidades Vendidas'],
              rows: [
                  ['Producto A', 250],
                  ['Producto B', 200],
                  ['Producto C', 150]
              ]
          }
      },
      fallback: {
          type: 'text',
          content: 'Lo siento, no entendí eso. ¿Podrías reformularlo?'
      }
  },
  fr: {
      greeting: {
          type: 'text',
          content: "Bonjour ! Comment puis-je vous aider aujourd'hui ?"
      },
      sales: {
          type: 'chart',
          chartType: 'line',
          content: 'Voici les ventes mensuelles de 2023 (en USD).',
          data: {
              labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun'],
              values: [1200, 1500, 1100, 1800, 1700, 1600],
              seriesName: 'Ventes'
          }
      },
      products: {
          type: 'table',
          content: 'Top 3 des produits par ventes',
          data: {
              columns: ['Produit', 'Unités Vendues'],
              rows: [
                  ['Produit A', 250],
                  ['Produit B', 200],
                  ['Produit C', 150]
              ]
          }
      },
      fallback: {
          type: 'text',
          content: "Désolé, je n'ai pas compris. Pourriez-vous reformuler ?"
      }
  }
};
