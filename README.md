# ACFT Calculator

A modern, professional, fully responsive Army Combat Fitness Test (ACFT) Calculator built with React and Tailwind CSS. This application allows users to calculate their ACFT score, determine pass/fail status based on MOS physical demand categories, and access comprehensive information about the test.

## Features

- **Interactive Calculator**: Enter event results and get instant score calculations
- **Live Preview**: Real-time scoring as you input data
- **MOS Categories**: Support for Heavy, Significant, and Moderate physical demand categories
- **Comprehensive Standards**: Detailed information about scoring requirements
- **Event Information**: Complete descriptions of all six ACFT events
- **FAQ Section**: Common questions and answers about the ACFT
- **Responsive Design**: Mobile-first design that works on all devices
- **Accessibility**: Full keyboard navigation and screen reader support
- **Data Persistence**: Saves your last calculation in localStorage
- **Sharing**: Share results via native sharing or clipboard

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd my-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # Navigation header
│   ├── Hero.js         # Hero section
│   ├── Calculator.js   # Main calculator form
│   ├── EventCards.js   # Event descriptions
│   ├── Standards.js    # Scoring standards
│   ├── FAQ.js          # Frequently asked questions
│   └── Footer.js       # Site footer
├── data/
│   └── scoringTables.json  # ACFT scoring data
├── utils/
│   ├── scoringLogic.js     # Scoring calculation functions
│   └── __tests__/          # Unit tests
└── App.js              # Main application component
```

## Scoring Data

The scoring tables are located in `src/data/scoringTables.json`. This file contains:

- Age and sex-specific scoring tables for all six events
- MOS physical demand category requirements
- Minimum score thresholds

### Updating Scoring Tables

To update the scoring tables with official Army data:

1. Open `src/data/scoringTables.json`
2. Replace the existing data with official Army scoring tables
3. Ensure the structure matches the existing format
4. Test the calculator with known values to verify accuracy

## ACFT Events

1. **Maximum Deadlift (MDL)**: 3-rep maximum deadlift
2. **Standing Power Throw (SPT)**: Overhead backward throw of 10-lb medicine ball
3. **Hand Release Push-ups (HRP)**: Maximum repetitions in 2 minutes
4. **Sprint-Drag-Carry (SDC)**: 250-meter course with drag and carry
5. **Plank (PLK)**: Maximum time in plank position
6. **2-Mile Run (2MR)**: 2-mile run for time

## MOS Physical Demand Categories

- **Heavy**: Combat Arms and physically demanding MOSs (440+ points)
- **Significant**: Moderate physical demands (400+ points)
- **Moderate**: Lower physical demands (360+ points)

## Testing

Run the test suite:

```bash
npm test
```

The test suite includes unit tests for:
- Event point calculations
- Total score calculations
- Pass/fail determinations
- Time conversion utilities

## Accessibility Features

- Full keyboard navigation
- Screen reader support with ARIA labels
- High contrast design
- Focus indicators
- Semantic HTML structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## Disclaimer

This calculator is for training and planning purposes only. Official ACFT scoring must be conducted by certified test administrators using approved equipment and procedures. Always consult with your chain of command for official requirements.

## License

This project is licensed under the MIT License.