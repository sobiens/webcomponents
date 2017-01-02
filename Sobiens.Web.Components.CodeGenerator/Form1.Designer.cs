namespace Sobiens.Web.Components.CodeGenerator
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.ConnectionStringTextBox = new System.Windows.Forms.TextBox();
            this.PopulateObjectsButton = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.treeView1 = new System.Windows.Forms.TreeView();
            this.GenerateCodeButton = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // ConnectionStringTextBox
            // 
            this.ConnectionStringTextBox.Location = new System.Drawing.Point(109, 11);
            this.ConnectionStringTextBox.Name = "ConnectionStringTextBox";
            this.ConnectionStringTextBox.Size = new System.Drawing.Size(339, 20);
            this.ConnectionStringTextBox.TabIndex = 0;
            this.ConnectionStringTextBox.Text = resources.GetString("ConnectionStringTextBox.Text");
            // 
            // PopulateObjectsButton
            // 
            this.PopulateObjectsButton.Location = new System.Drawing.Point(468, 8);
            this.PopulateObjectsButton.Name = "PopulateObjectsButton";
            this.PopulateObjectsButton.Size = new System.Drawing.Size(106, 23);
            this.PopulateObjectsButton.TabIndex = 1;
            this.PopulateObjectsButton.Text = "Populate Objects";
            this.PopulateObjectsButton.UseVisualStyleBackColor = true;
            this.PopulateObjectsButton.Click += new System.EventHandler(this.PopulateObjectsButton_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 14);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(91, 13);
            this.label1.TabIndex = 2;
            this.label1.Text = "Connection String";
            // 
            // treeView1
            // 
            this.treeView1.Location = new System.Drawing.Point(15, 41);
            this.treeView1.Name = "treeView1";
            this.treeView1.Size = new System.Drawing.Size(433, 396);
            this.treeView1.TabIndex = 3;
            // 
            // GenerateCodeButton
            // 
            this.GenerateCodeButton.Location = new System.Drawing.Point(468, 414);
            this.GenerateCodeButton.Name = "GenerateCodeButton";
            this.GenerateCodeButton.Size = new System.Drawing.Size(106, 23);
            this.GenerateCodeButton.TabIndex = 4;
            this.GenerateCodeButton.Text = "Generate Code";
            this.GenerateCodeButton.UseVisualStyleBackColor = true;
            this.GenerateCodeButton.Click += new System.EventHandler(this.GenerateCodeButton_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(807, 449);
            this.Controls.Add(this.GenerateCodeButton);
            this.Controls.Add(this.treeView1);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.PopulateObjectsButton);
            this.Controls.Add(this.ConnectionStringTextBox);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox ConnectionStringTextBox;
        private System.Windows.Forms.Button PopulateObjectsButton;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TreeView treeView1;
        private System.Windows.Forms.Button GenerateCodeButton;
    }
}

