Hooks.once("init", async function () {
  console.log("UESRPG Character Creator | Initializing...");
});

Hooks.once("ready", async function () {
  console.log("UESRPG Character Creator | Ready!");

  // Add a button to the sidebar
  addSidebarButton();
});

function addSidebarButton() {
  // Create a button in the sidebar
  const button = $(`
    <button id="uesrpg-character-creator-button">
      <i class="fas fa-user-plus"></i> Create Character
    </button>
  `);

  // Add the button to the sidebar
  $("#sidebar-tabs").append(button);

  // Add a click event to open the character creation form
  button.click(() => {
    renderCharacterCreationForm();
  });
}

function renderCharacterCreationForm() {
  const html = await renderTemplate("modules/uesrpg-character-creator/templates/character-creation.html");
  new Dialog({
    title: "UESRPG Character Creator",
    content: html,
    buttons: {
      create: {
        label: "Create Character",
        callback: (html) => handleCharacterCreation(html),
      },
    },
  }).render(true);
}

function handleCharacterCreation(html) {
  // Collect data from the form
  const race = html.find("#race-select").val();
  const background = html.find("#background").val();
  const strength = html.find("#strength").val();
  const agility = html.find("#agility").val();
  const intelligence = html.find("#intelligence").val();
  const skills = [];
  html.find("input[name='skills']:checked").each(function () {
    skills.push($(this).val());
  });
  const birthsign = html.find("#birthsign").val();
  const weapon = html.find("#weapon").val();
  const armor = html.find("#armor").val();
  const magicItem = html.find("#magic-item").val();
  const personality = html.find("#personality").val();
  const appearance = html.find("#appearance").val();

  // Create the actor
  const actorData = {
    name: "New Character",
    type: "character",
    system: {
      race: race,
      background: background,
      attributes: {
        strength: strength,
        agility: agility,
        intelligence: intelligence,
      },
      skills: skills,
      birthsign: birthsign,
      equipment: {
        weapon: weapon,
        armor: armor,
        magicItem: magicItem,
      },
      details: {
        personality: personality,
        appearance: appearance,
      },
    },
  };

  Actor.create(actorData).then((actor) => {
    console.log("Character created:", actor);
    ui.notifications.info(`Character ${actor.name} created successfully!`);
  });
}
