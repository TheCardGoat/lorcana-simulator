class CardHoverCardRegistry {
  activeCardId = $state<string | null>(null);

  open(cardId: string): void {
    this.activeCardId = cardId;
  }

  close(cardId: string): void {
    if (this.activeCardId === cardId) {
      this.activeCardId = null;
    }
  }
}

export const cardHoverCardRegistry = new CardHoverCardRegistry();
