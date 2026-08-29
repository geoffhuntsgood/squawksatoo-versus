# Squawksatoo

Inspired by Talkatoo% runs in Super Mario Odyssey, this app randomly selects bananas to find in Donkey Kong Bananza, or items in Donkey Kong 64.

Hosted at <https://geoffhuntsgood.com/squawksatoo>.

## Configuration

The app will start by displaying configuration settings, depending on which base game you are playing.

### DKB

Selecting a layer will generate categories based on the available bananas in that layer. These can be individually selected, or left blank to include them all. The count display allows for 1-5 bananas to show at once.

**Include Postgame:** Adds bananas that are only available after defeating K. Rool.

**Timer:** Adds a timer on the game page that automatically stops when the game finishes.

**Auto-Refresh:** If selected, marking a banana as complete will automatically replace that banana with a new one, until all bananas have been collected.

**Recycle Wrong Bananas:** If selected, marking a banana wrong will "recycle" that banana back into the pool for re-selection later. Only available when Auto-refresh is checked.

**Hell Mode:** Adds particularly long goals into the pool, such as the "A Complete Fossil Collection" banana.

### DK64

Selecting a level will generate categories based on the available items in that level. All levels are selected by default, and categories can be individually selected, or left blank to include them all. The count display allows for 1-5 items to show at once.

**Timer:** Adds a timer on the game page that automatically stops when the game finishes.

**Auto-Refresh:** If selected, marking an item as complete will automatically replace that item with a new one, until all items have been collected.

**Hell Mode:** Adds particularly long goals into the pool, such as the Rareware and Nintendo Coins and the Rareware GB.

## Playing the Game

**Header:** If auto-refresh was selected, the header will display the remaining number of bananas in the configured list.

**Item List:** Clicking the check next to a displayed item will add it to the "correct" counter. If playing for Bananza, clicking the X will add that item to the "wrong" counter. Both will mark the item as completed (unless recycling in Bananza).

**Reconfigure:** Returns to the settings page.
