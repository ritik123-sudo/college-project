# produce simple human insights
def generate(inspect_df):
    notes = []
    for _, r in inspect_df.iterrows():
        if r["status"] == "Critical":
            notes.append(f"You will run out of {r['product']} in ~{r['days_left']} days. Recommend reorder {r['recommended_qty']}.")
        elif r["status"] == "Low":
            notes.append(f"Low stock for {r['product']}. Consider reorder.")
    if not notes:
        notes.append("Inventory levels look healthy.")
    return notes
