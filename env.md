## Table 1: Basic SimCity Environment (Proof of Concept)

| **Parameter** | **Value** | **Description** |
|---------------|-----------|-----------------|
| **Environment Configuration** |
| Grid Size | 4×4 | Small-scale urban planning grid |
| Episode Duration | 100 timesteps | Full episode length allowing utility accumulation |
| Players | 3 agents | Multi-agent collaborative setting |
| Common Reward | True | Shared reward structure promoting cooperation |
| **Player Types & Preferences** |
| Altruistic (P1) | α=0.2, β=0.8 | Community-focused, high social weight |
| Balanced (P2) | α=0.5, β=0.5 | Equal personal and social considerations |
| Interest-Driven (P3) | α=0.8, β=0.2 | Economically motivated, low social weight |
| Starting Resources | Money: 50, Reputation: 50 | Initial resource allocation per player |
| **Grid Parameters** |
| G (Green/Environment) | Initial: 15 | Environmental quality metric |
| V (Vibrancy/Economic) | Initial: 20 | Economic activity and vibrancy |
| D (Density/Social) | Initial: 30 | Population density and social infrastructure |
| **Building Types** |
| Park | Cost: 5💰+15🏆, Utility: -1💰+4🏆 | Environmental enhancement (+30G, -30V, 0D) |
| House | Cost: 10💰+10🏆, Utility: +2💰+1🏆 | Residential development (-30G, 0V, +30D) |
| Shop | Cost: 15💰+5🏆, Utility: +3💰+0🏆 | Commercial development (0G, +30V, -30D) |
| **Neighbor Effects** |
| Park Neighbors | +10G, -10V, 0D | Positive environmental spillover |
| House Neighbors | -10G, 0V, +10D | Residential density effects |
| Shop Neighbors | 0G, +10V, -10D | Commercial activity spillover |
| **Theoretical Optimization** |
| Decision Space | 3 players × 16 cells × 3 buildings = 144 actions | Finite but complex decision space |
| Optimization Method | Simulation-based heuristic search | Systematic evaluation of scenarios |
| Theoretical Optimal | 6,690 total episode returns | Maximum achievable performance |

---

## Table 2: Scaled-Up Urban Resilience Environment

| **Parameter** | **Value** | **Description** |
|---------------|-----------|-----------------|
| **Environment Configuration** |
| Grid Size | 8×8 | Realistic urban scale with 64 total cells |
| Episode Duration | 100 timesteps | Extended planning horizon |
| Players | 4 agents | Increased multi-agent complexity |
| Common Reward | False | Individual reward structure |
| **Player Types & Perspectives** |
| Community-Focused (P1) | Altruistic Player | Prioritizes social cohesion and well-being |
| Balanced Approach (P2) | Balanced Player | Moderate across all resilience dimensions |
| Economic Efficiency (P3) | Interest-Driven Player | Market-oriented development focus |
| Environmental Focus (P4) | Balanced Player | Sustainability and climate considerations |
| Starting Resources | Money: 80, Reputation: 80 | Increased resources for larger scale |
| **Urban Resilience Grid Parameters** |
| S (Sustainability) | Initial: 20 | Environmental impact, renewable energy |
| W (Well-being) | Initial: 25 | Community health, social cohesion |
| R (Resilience) | Initial: 15 | Disaster preparedness, adaptability |
| C (Climate) | Initial: 10 | Carbon footprint, climate adaptation |
| **Basic Development Buildings** |
| House | Cost: 10💰+5🏆, Utility: +4💰+1🏆 | Standard residential (-10S, +20W, +15R, -5C) |
| Shop | Cost: 12💰+3🏆, Utility: +6💰+0🏆 | Commercial retail (-15S, +10W, +5R, -10C) |
| **Resilience Infrastructure Projects** |
| GreenPark | Cost: 15💰+12🏆, Utility: -1💰+4🏆 | Urban green infrastructure (+40S, +35W, +20R, +30C) |
| CommunityHub | Cost: 20💰+15🏆, Utility: +1💰+5🏆 | Social resilience center (+10S, +45W, +35R, +5C) |
| SolarGrid | Cost: 25💰+8🏆, Utility: +5💰+2🏆 | Renewable energy (+50S, +5W, +25R, +45C) |
| FloodBarrier | Cost: 30💰+10🏆, Utility: -2💰+3🏆 | Climate protection (+5S, +10W, +50R, +35C) |
| **Spatial Constraints** |
| Non-Buildable Terrain | 16 cells (25%) | River, mountain, lake, highway, railway |
| Pre-Built Infrastructure | 4 cells (6.25%) | Hospital, school, fire station, power plant |
| Buildable Space | 44 cells (68.75%) | Available for player development projects |
| **Urban Complexity Features** |
| Terrain Types | 5 types | Natural and infrastructure constraints |
| Pre-Built Projects | 4 city facilities | Existing urban infrastructure with effects |
| Neighbor Effects | Radius-based | Spillover effects for all building types |
| **Optimization Challenges** |
| Decision Space | 4 players × 44 cells × 6 buildings | Exponentially larger complexity |
| Optimization Method | Reinforcement Learning (MAPPO) | Mathematical programming intractable |
| Performance Metric | Individual episode returns | No common theoretical optimal available |

**Legend:** 💰 = Money, 🏆 = Reputation, S/W/R/C = Sustainability/Well-being/Resilience/Climate metrics




## Table 1: Experimental Settings Comparison

| **Parameter** | **Basic SimCity (Proof of Concept)** | **Scaled-Up Urban Resilience** |
|---------------|---------------------------------------|--------------------------------|
| **Environment Configuration** |
| Grid Size | 4×4 (16 cells) | 8×8 (64 cells) |
| Episode Duration | 100 timesteps | 100 timesteps |
| Number of Players | 3 agents | 4 agents |
| **Player Types & Preferences** |
| Player 1 | Altruistic (α=0.2, β=0.8) | Community-Focused Altruistic (α=0.2, β=0.8) |
| Player 2 | Balanced (α=0.5, β=0.5) | Balanced Approach (α=0.5, β=0.5) |
| Player 3 | Interest-Driven (α=0.8, β=0.2) | Economic Efficiency Interest-Driven (α=0.8, β=0.2) |
| Player 4 | - | Environmental Focus Balanced (α=0.5, β=0.5) |
| Starting Resources | Money: 50, Reputation: 50 | Money: 80, Reputation: 80 |
| **Grid Parameters** |
| Parameter Types | G (Green/Environment): 15<br>V (Vibrancy/Economic): 20<br>D (Density/Social): 30 | S (Sustainability): 20<br>W (Well-being): 25<br>R (Resilience): 15<br>C (Climate): 10 |
| **Building Options** |
| Basic Buildings | Park (Cost: 5 Money + 15 Reputation)<br>House (Cost: 10 Money + 10 Reputation)<br>Shop (Cost: 15 Money + 5 Reputation) | House (Cost: 10 Money + 5 Reputation)<br>Shop (Cost: 12 Money + 3 Reputation) |
| Advanced Buildings | - | GreenPark (Cost: 15 Money + 12 Reputation)<br>CommunityHub (Cost: 20 Money + 15 Reputation)<br>SolarGrid (Cost: 25 Money + 8 Reputation)<br>FloodBarrier (Cost: 30 Money + 10 Reputation) |
| Total Building Types | 3 | 6 |
| **Spatial Constraints** |
| Buildable Space | 16 cells (100%) | 44 cells (68.75%) |
| Non-Buildable Terrain | None | 16 cells (25%): River, mountain, lake, highway, railway |
| Pre-Built Infrastructure | None | 4 cells (6.25%): Hospital, school, fire station, power plant |
| **Optimization Approach** |
| Decision Space Complexity | 3 players × 16 cells × 3 buildings | 4 players × 44 cells × 6 buildings |
| Optimization Method | Simulation-based heuristic search | Reinforcement Learning (MAPPO) |
| Theoretical Optimal | 6,690 total episode returns | Not calculable (exponential complexity) |
| **Research Purpose** |
| Primary Goal | Validate RL effectiveness against theoretical benchmark | Apply RL to realistic urban planning scenarios |
| Key Challenge | Multi-agent coordination in simple setting | Scalability with spatial and resource constraints |

**Legend:** 💰 = Money, 🏆 = Reputation, S/W/R/C = Sustainability/Well-being/Resilience/Climate metrics 